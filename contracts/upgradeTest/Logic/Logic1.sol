// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LogicState.sol";

contract Logic1 is LogicState, Initializable {
    function logicInit(uint256 _initialNumber) external initializer {
        number1 = _initialNumber;
    }

    function updateUint(uint256 _newNumber) external {
        number1 = _newNumber;

        emit Number1Updated(_newNumber);
    }

    function updateString(string memory _newString) external {
        initialString = _newString;
    }

    // todo: test tx.origin and msg.sender

    // test event calling from proxy contract
    event Number1Updated(uint256 updatedNumber);
}
