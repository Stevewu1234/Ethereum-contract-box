// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LogicState.sol";

contract Logic2 is LogicState, Initializable {
    uint256 public number2;

    function logicInit(uint256 _initialUint) external initializer {
        number1 = _initialUint;
    }

    function updateUint(uint256 _newNumber) external {
        number1 = _newNumber;
    }

    function updateString(string memory _newString) external {
        initialString = _newString;
    }

    function updateNewNumber(uint256 _number) external {
        number2 = _number;
    }
}
