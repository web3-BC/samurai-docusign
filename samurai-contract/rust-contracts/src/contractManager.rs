use ink_lang as ink;

#[ink::contract]
mod contract_manager {
    use ink_prelude::string::String;
    use ink_prelude::vec::Vec;

    #[ink(storage)]
    pub struct ContractManager {
        contracts: ink_storage::collections::HashMap<ink_storage::collections::Vec<u8>, Contract>,
    }

    #[ink(event)]
    pub struct ContractIssued {
        sender: AccountId,
        recipient: Option<AccountId>,
        encrypted_cid: String,
    }

    #[ink(event)]
    pub struct ContractSigned {
        sender: AccountId,
        recipient: AccountId,
        encrypted_cid: String,
    }

    #[derive(
        scale::Encode,
        scale::Decode,
        ink_storage::traits::SpreadLayout,
        ink_storage::traits::PackedLayout,
    )]
    #[cfg_attr(feature = "std", derive(Debug))]
    pub struct Contract {
        sender: AccountId,
        recipient: Option<AccountId>,
        encrypted_cid: String,
        hashed_email: String,
        encrypted_symmetric_key: String,
        is_signed: bool,
    }

    impl ContractManager {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                contracts: ink_storage::collections::HashMap::new(),
            }
        }

        #[ink(message)]
        pub fn issue_contract(
            &mut self,
            encrypted_cid: String,
            hashed_email: String,
            encrypted_symmetric_key: String,
        ) {
            let sender = self.env().caller();
            let contract = Contract {
                sender,
                recipient: None,
                encrypted_cid: encrypted_cid.clone(),
                hashed_email: hashed_email.clone(),
                encrypted_symmetric_key: encrypted_symmetric_key.clone(),
                is_signed: false,
            };

            if let Some(existing_contract) = self.contracts.get(&encrypted_cid) {
                ink_env::debug_println("Contract already issued");
                return;
            }

            self.contracts.insert(encrypted_cid.clone(), contract.clone());

            self.env().emit_event(ContractIssued {
                sender: contract.sender,
                recipient: None,
                encrypted_cid: encrypted_cid.clone(),
            });
        }

        #[ink(message)]
        pub fn sign_contract(&mut self, encrypted_cid: String) {
            let sender = self.env().caller();
            let mut contract = match self.contracts.get(&encrypted_cid) {
                Some(existing_contract) => existing_contract.clone(),
                None => {
                    ink_env::debug_println("Contract not found");
                    return;
                }
            };

            if contract.is_signed {
                ink_env::debug_println("Contract already signed");
                return;
            }

            contract.recipient = Some(sender);
            contract.is_signed = true;

            self.contracts.insert(encrypted_cid.clone(), contract.clone());

            self.env().emit_event(ContractSigned {
                sender: contract.sender,
                recipient: contract.recipient.unwrap(),
                encrypted_cid: encrypted_cid.clone(),
            });
        }

        #[ink(message)]
        pub fn get_contract_by_encrypted_cid(
            &self,
            encrypted_cid: String,
        ) -> Option<Contract> {
            self.contracts.get(&encrypted_cid).cloned()
        }
    }
}
