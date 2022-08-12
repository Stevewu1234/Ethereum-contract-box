// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITest {
    function set(uint256 _reward) external;
}

contract Delegate {
    uint256 public reward;
    address public caller;

    event CallBydelegate(address caller, address testAddress);

    error incorrectData();

    function callByDelegate(address testAddress, uint256 _reward) external {
        reward = _reward;
        caller = msg.sender;

        (bool success, ) = testAddress.delegatecall(
            abi.encodeWithSignature("set(uint256)", _reward)
        );

        if (success == false) {
            revert incorrectData();
        }
    }

    function newcallWithSelector(address testAddress, uint256 _reward)
        external
    {
        reward = _reward;
        caller = msg.sender;

        (bool success, ) = testAddress.delegatecall(
            abi.encodeWithSelector(ITest.set.selector, _reward)
        );

        if (success == false) {
            revert incorrectData();
        }
    }
}
