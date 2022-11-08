// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogicState {
    uint256 public number1;
    string public initialString;

    mapping(uint256 => string) public uToString;

    uint256[50] private __gap;
}
