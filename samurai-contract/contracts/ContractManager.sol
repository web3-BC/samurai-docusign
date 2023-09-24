// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ContractManager {
    constructor() {}

    event ContractIssued(
        address indexed sender,
        address indexed recipient,
        string encryptedCid
    );
    event ContractSigned(
        address indexed sender,
        address indexed recipient,
        string encryptedCid
    );

    struct Contract {
        address sender;
        address recipient;
        string encryptedCid;
        string hashedEmail;
        string encryptedSymmetricKey;
        bool isSigned;
    }

    mapping(string => Contract) public encryptedCidToContract;
    mapping(address => string[]) public senderToEncryptedCids;

    function issueContract(
        string calldata encryptedCid,
        string calldata hashedEmail,
        string calldata encryptedSymmetricKey
    ) external {
        require(
            encryptedCidToContract[encryptedCid].sender == address(0),
            "Contract already issued"
        );

        Contract memory newContract = Contract(
            msg.sender,
            address(0),
            encryptedCid,
            hashedEmail,
            encryptedSymmetricKey,
            false
        );
        encryptedCidToContract[encryptedCid] = newContract;
        senderToEncryptedCids[msg.sender].push(encryptedCid);

        emit ContractIssued(
            newContract.sender,
            address(0),
            newContract.encryptedCid
        );
    }

    function signContract(string calldata encryptedCid) external {
        Contract memory contractToSign = encryptedCidToContract[encryptedCid];
        require(!contractToSign.isSigned, "Contract already signed");

        contractToSign.recipient = msg.sender;
        contractToSign.isSigned = true;
        encryptedCidToContract[encryptedCid] = contractToSign;

        emit ContractSigned(
            contractToSign.sender,
            contractToSign.recipient,
            contractToSign.encryptedCid
        );
    }

    function getContractByEncryptedCid(
        string calldata encryptedCid
    ) external view returns (Contract memory) {
        return encryptedCidToContract[encryptedCid];
    }

    function getContractsBySender(
        address _sender
    ) public view returns (Contract[] memory) {
        string[] memory encryptedCids = senderToEncryptedCids[_sender];
        Contract[] memory contracts = new Contract[](encryptedCids.length);

        for (uint i = 0; i < encryptedCids.length; i++) {
            contracts[i] = encryptedCidToContract[encryptedCids[i]];
        }

        return contracts;
    }
}
