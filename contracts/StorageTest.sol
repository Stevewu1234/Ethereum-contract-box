// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageTest {

  struct A {
    uint256 f;
    uint256 g;
  }

  uint256 public data1 = 4;

  string public stringTest = "a";

  uint[] public array1 = [1,2,3];

  mapping(uint256 => A) public testdata;

  A public a;

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
