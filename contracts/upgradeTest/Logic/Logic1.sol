// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "./LogicStorage.sol";

contract Logic1 is LogicStoreage, Initializable {
    function logicInit() external initializer {
        initialUint;
    }

    function updateUint(uint256 _newNumber) external {
        initialUint = _newNumber;
    }

    function updateString(string memory _newString) external {
        initialString = _newString;
    }
}
