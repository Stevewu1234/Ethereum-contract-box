pragma solidity ^0.8.0;

contract test {

    string public  x;
    address public caller;
    uint public reward;

    event callByDelegate(address caller);

    function set(uint _reward) external {
        caller = msg.sender;
        reward = _reward;

        emit callByDelegate(msg.sender);
    }

}