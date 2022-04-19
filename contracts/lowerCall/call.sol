pragma solidity ^0.8.0;

interface ITest {

    function set(uint256 _reward) external;
}

contract call {
    

    uint public reward;
    address public caller;

    error failcall();

    function testByCallWithSignature(uint _reward, address _testAddress) external {
        
        (bool success, ) =
        _testAddress.call(abi.encodeWithSignature("set(uint256)",_reward));

        if(success == false) { revert failcall(); }
    }

    function testByCallWithSelector(uint _reward, address _testAddress) external {
        
        (bool success, ) =
        _testAddress.call(abi.encodeWithSelector(ITest.set.selector, _reward));
        
        if(success == false) { revert failcall(); }
    }

    function testByCallWithPacked(address _target, address receiver) external {
        

        bytes memory data = abi.encode(receiver, 1000e18);
        bytes memory payload = abi.encodePacked(bytes4(keccak256(bytes("transfer(address,uint256)"))), data);
        (bool success, ) = _target.call(payload);

        require(success, "fail to execute");
        
    }
}