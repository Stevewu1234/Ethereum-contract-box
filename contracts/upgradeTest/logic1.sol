// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Logic1Upgradeable is Initializable {
    uint256 public initialNum1;

    string public stringData2;

    function logicInit() external initializer {
        initialNum1 = 1;
    }
}
