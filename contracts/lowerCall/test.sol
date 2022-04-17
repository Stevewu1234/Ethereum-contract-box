pragma solidity ^0.8.0;

contract test {

    uint public reward;
    address public caller;

    event callByDelegate(address caller);

    function set(uint _reward) external {
        caller = msg.sender;
        reward = _reward;

        emit callByDelegate(msg.sender);

    }

}