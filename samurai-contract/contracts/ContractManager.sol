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
}
