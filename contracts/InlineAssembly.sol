// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract InlineAssembly {
    function sum(uint256[] memory _data) public view returns (uint256 sum) {
        console.logBytes(msg.data);
        for (uint256 i = 0; i < _data.length; i++) {
            assembly {
                sum := add(sum, mload(add(add(_data, 0x20), mul(i, 0x20))))
            }
        }
    }
}
