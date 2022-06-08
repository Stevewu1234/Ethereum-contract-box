// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// todo: check if the msg.sender of the signed message sent by other address is equal to the signer
// todo: check if the signed message can be used by address to operate signer's value

contract SignMessage is EIP712, Ownable {
    address public Permit1RecordUser;
    address public Permit2RecordUser;

    // avoid to multiply call the same func
    mapping (address => uint) public nonces;
    uint256 public chainId;

    bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address owner,uint256 value,uint256 deadline)");

    constructor(
        uint256 chainId_
    ) EIP712("SignMessage", "1") {
        chainId = chainId_;
    }

    // generate a hash message to verify the generated offchain signature
    function PermitWithValue(        
        address owner, 
        uint256 value,
        uint256 deadline,
        bytes memory signature
        ) public {

        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, owner, value, deadline));
        bytes32 messageHash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(messageHash, signature);
        require(signer == owner, "invalid data");

        Permit1RecordUser = _msgSender();

        emit PermittedWithValue(owner, value, deadline);
    }

    // verify the generated offchain signature directly
    function PermitWithHasedhMessage(
        bytes32 message, 
        bytes memory signature
        ) public {
        address signer = ECDSA.recover(message, signature);
        require(signer == msg.sender, "invalid data");

        Permit2RecordUser = _msgSender();

        emit PermittedWithHashedMessage(signer);
    }

    /** ========== event ========== */
    event PermittedWithValue(address signer, uint256 value, uint256 deadline);
    event PermittedWithHashedMessage(address signer);
}