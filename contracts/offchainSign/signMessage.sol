// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// todo: check if the msg.sender of the signed message sent by other address is equal to the signer
// todo: check if the signed message can be used by address to operate signer's value

contract signMessage is EIP712, Ownable {
    address public user1;
    address public user2;

    uint256 public storedValue;

    address public delegateCallContract;

    mapping (address => uint) public nonces;

    // bytes32 private constant PERMIT_TYPEHASH =
    //     keccak256("Permit(address owner,uint256 value,uint256 deadline)");

    bytes32 public DOMAIN_SEPARATOR;
    // bytes32 public constant PERMIT_TYPEHASH = keccak256("Permit(address holder,address spender,uint256 nonce,uint256 expiry,bool allowed)");
    bytes32 public constant PERMIT_TYPEHASH = 0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb;

    constructor(
        uint8 chainId_
        // address delegateCallContract_
    ) EIP712("signMessage", "1") {
        // delegateCallContract = delegateCallContract_;


        DOMAIN_SEPARATOR = keccak256(abi.encode(
            keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
            keccak256(bytes("signMessage")),
            keccak256(bytes("1")),
            chainId_,
            address(this)
        ));
    }

    // 
    function changeUser1(        
        address owner, 
        uint256 value,
        uint256 deadline
        // bytes memory signature
        ) public view returns ( bytes32, bytes32, bytes32 ){

        // bytes32 domainHash = keccak256(abi.encode(DOMAIN_HASH, bytes("signMessage"), bytes("1"), 31337, address(this)));
        bytes32 domainHash = _domainSeparatorV4();
        bytes32 structHash = keccak256(abi.encode(PERMIT_TYPEHASH, owner, value, deadline));
        bytes32 messageHash = _hashTypedDataV4(structHash);
        
        // bytes32 testHash = keccak256(bytes("Hello world"));

        // address signer = ECDSA.recover(messageHash, signature);
        // require(signer == owner, "invalid data");

        // user1 = _msgSender();
        // storedValue = value;
        return (domainHash, structHash, messageHash);
    }

    function verify(bytes32 message, bytes memory _sig) public pure returns (address) {
        address signer = ECDSA.recover(message, _sig);

        
        return signer;
    }

    function permit(address holder, address spender, uint256 nonce, uint256 expiry,
                    bool allowed, uint8 v, bytes32 r, bytes32 s) external
    {
        bytes32 digest =
            keccak256(abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH,
                                     holder,
                                     spender,
                                     nonce,
                                     expiry,
                                     allowed))
        ));

        require(holder != address(0), "Dai/invalid-address-0");
        require(holder == ecrecover(digest, v, r, s), "Dai/invalid-permit");
        require(expiry == 0 || block.timestamp <= expiry, "Dai/permit-expired");
        require(nonce == nonces[holder]++, "Dai/invalid-nonce");


        // emit Approval(holder, spender, wad);
    }

}