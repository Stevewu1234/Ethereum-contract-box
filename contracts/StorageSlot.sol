// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageSLot {
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

    // todo: variables
    // todo: event
    // todo: error
    // todo: function
}
