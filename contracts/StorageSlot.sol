// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract test1 {}

contract test2 {}

contract StorageSLot is test2 {
    // dynamic types
    bytes public testBytes;
    string public stringTest = "a";
    struct A {
        uint256 f;
        uint256 g;
    }
    A public a;
    mapping(uint256 => A) public testdata;
    uint256[] public array1 = [1, 2, 3];
    enum EnumData {
        data1,
        data2,
        data3
    }

    // static types
    uint128 public udata128;
    uint256 public udata256;
    int128 public idata128;
    int256 public idata256;
    bytes4 public bdata4;
    bytes32 public bdata32;

    // event
    event AddData(uint256 indexed a);

    // error
    error WrongData(uint256 a);

    constructor(uint256 b) {
        testdata[1].f = b;
        a.f = 2;
        a.g = 5;
    }

    // =========== check global available Variables ==========
    function contractName() external pure returns (string memory) {
        return type(StorageSLot).name;
    }

    function contractByteCode() external pure returns (bytes memory) {
        return type(test1).creationCode; // only allowed to access byteCode of another contract
        // return type(test2).creationCode; // inherited contract is not referring
        // return type(StorageSlot).creationCode // not referring
    }

    function contractRuntimeCode() external pure returns (bytes memory) {
        return type(test1).runtimeCode;
    }

    // the encode between dynamic type "bytes" and static type "bytes3" or "bytes32" ...
    function encodeBytes(bytes3 name) external pure returns (bytes memory) {
        bytes4 selector = bytes4(keccak256(abi.encode("encodeBytes(bytes3)")));
        return abi.encodeWithSelector(selector, name);
    }

    function encodeBytes(string memory name)
        external
        pure
        returns (bytes memory)
    {
        bytes4 selector = bytes4(keccak256(abi.encode("encodeBytes(bytes3)")));
        return abi.encodeWithSelector(selector, name);
    }

    // todo: variables
    // todo: event
    // todo: error
    // todo: function
}
