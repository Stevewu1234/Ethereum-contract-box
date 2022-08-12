// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Test {
    uint256 public reward;
    address public caller;

    event CallByDelegate(address caller);

    function set(uint256 _reward) external {
        caller = msg.sender;
        reward = _reward;

        emit CallByDelegate(msg.sender);
    }
}
