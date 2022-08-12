// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SignTestContract is EIP712, Ownable {
    address public Permit1RecordUser;
    address public Permit2RecordUser;

    string public testString;

    // avoid to multiply call the same func
    mapping(address => uint256) public nonce;

    bytes32 public constant PERMIT_TYPEHASH =
        keccak256(
            "permitWithValue(address owner,uint256 value,string testString,uint256 deadline,uint256 nonce)"
        );

    constructor() EIP712("SignTestContract", "1") {}

    // generate a hash message to verify the generated offchain signature
    function permitWithValue(
        address owner,
        uint256 value,
        string memory _testString,
        uint256 deadline,
        bytes memory signature
    ) public {
        bytes32 structHash = keccak256(
            abi.encode(
                PERMIT_TYPEHASH,
                owner,
                value,
                keccak256(bytes(_testString)),
                deadline,
                nonce[owner]++
            )
        );
        bytes32 messageHash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(messageHash, signature);
        require(signer == owner, "invalid signature");

        Permit1RecordUser = owner;
        testString = _testString;

        emit PermittedWithValue(owner, value, testString, deadline);
    }

    // verify the generated offchain signature directly
    function permitWithHasedhMessage(bytes32 message, bytes memory signature)
        public
    {
        address signer = ECDSA.recover(message, signature);
        require(signer == msg.sender, "invalid signature");

        Permit2RecordUser = _msgSender();

        emit PermittedWithHashedMessage(signer);
    }

    function testSignatureMessage(
        address owner,
        uint256 value,
        string memory _testString,
        uint256 deadline
    )
        external
        view
        returns (
            bytes32 domainHash,
            bytes32 structHash,
            bytes32 messageHash
        )
    {
        domainHash = _domainSeparatorV4();
        structHash = keccak256(
            abi.encode(
                PERMIT_TYPEHASH,
                owner,
                value,
                keccak256(bytes(_testString)),
                deadline,
                nonce[owner]
            )
        );
        messageHash = _hashTypedDataV4(structHash);
    }

    /** ========== event ========== */
    event PermittedWithValue(
        address signer,
        uint256 value,
        string testString,
        uint256 deadline
    );
    event PermittedWithHashedMessage(address signer);
}
