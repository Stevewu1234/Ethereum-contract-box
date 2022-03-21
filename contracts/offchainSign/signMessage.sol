// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// todo: check if the msg.sender of the signed message sent by other address is equal to the signer
// todo: check if the signed message can be used by address to operate signer's value

contract SignMessage is EIP712, Ownable {
    address public user1;
    address public user2;

    address public delegateCallContract;

    bytes32 private immutable _PERMIT_TYPEHASH =
        keccak256("Permit(address owner,uint256 value,uint256 nonce,uint256 deadline)");

    constructor(
        address delegateCallContract_
    ) EIP712("SignMessage", "1") {
        delegateCallContract = delegateCallContract_;
    }

    // 
    function changeUser1(        
        address owner, 
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public {

        bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, value, deadline));
        bytes32 messageHash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(messageHash, v, r, s);
        require(signer == owner, "invalid data");

        user1 = _msgSender();
    }

}