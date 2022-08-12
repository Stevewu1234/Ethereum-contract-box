// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractABIEncoder {
    // selector encode
    // function encode

    /**
     * @dev return a calldata encode to compare with offchain generated function encode.
     */
    function encodeFunc1(uint256 x, string memory y)
        external
        pure
        returns (bytes memory)
    {
        bytes4 selector = bytes4(keccak256(abi.encode(x, y)));
        return abi.encodeWithSelector(selector, x, y);
    }
    // return data encode
}
