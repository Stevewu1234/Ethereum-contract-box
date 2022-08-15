// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TargetContract {
    string public author;

    constructor(string memory _authorName) {
        author = _authorName;
    }
}

contract ContractFactory {
    // there are many ways to create a contract from another contract(factory contract)
    // 1. through 'create' in inline assembly
    // 2. through 'create2' in inline assembly
    // 3. through new Contract()

    function create() external {
        // bytes memory bytecode = type(TargetContract).creationCode;
        // assembly {
        //     target := create(bytecode, 0)
        // }
    }

    function create2() external {}

    function createWithNew() external returns (address) {
        TargetContract target = new TargetContract("stevewu");
        return address(target);
    }
}
