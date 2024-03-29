// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EeventLog {
    struct Test {
        uint256 number1;
    }

    mapping(address => Test) public mappingTest;

    event SimpleTransfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    event StringRecord(address indexed account, string content);

    event NumberRecord(address indexed account, uint256 number);

    event MapRecord(address indexed account, Test test);
}
