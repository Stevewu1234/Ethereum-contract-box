// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// todo: check if the msg.sender of the signed message sent by other address is equal to the signer
// todo: check if the signed message can be used by address to operate signer's value

contract SignMessage is ERC20Permit, Ownable {
    address public user1;
    address public user2;

    constructor() ERC20Permit("SignMessage") ERC20("testToken", "TT") {}

    function callWithoutCallerLimit(        address owner, 
        address spender, 
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public {

        permit(owner, spender, value, deadline, v, r, s);
        user1 = _msgSender();
    }

    function callWithCallerLimit(
        address owner, 
        address spender, 
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
        ) public {
        require(_msgSender() == owner, "caller is invalid");

        permit(owner, spender, value, deadline, v, r, s);
        user2 = _msgSender();
    }
}