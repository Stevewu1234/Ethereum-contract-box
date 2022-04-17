pragma solidity ^0.8.0;

interface ITest {
    function set(uint _reward) external;
}

contract delegate{
    
    uint public reward;
    address public caller;

    event callBydelegate(address caller, address testAddress);

    error incorrectData();

    function callByDelegate(address testAddress, uint _reward) external {

        reward = _reward;
        caller = msg.sender;
        
        (bool success, ) = 
        testAddress.delegatecall(abi.encodeWithSignature("set(uint256)", _reward));

        if(success == false) { revert incorrectData(); }
    }

    function newcallWithSelector(address testAddress, uint _reward) external {
        reward = _reward;
        caller = msg.sender;

        (bool success, ) = 
        testAddress.delegatecall(abi.encodeWithSelector(ITest.set.selector, _reward));

        if(success == false) { revert incorrectData(); }
    }
    
}