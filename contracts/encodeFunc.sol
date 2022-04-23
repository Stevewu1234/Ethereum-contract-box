pragma solidity ^0.8.0;

contract encodeFunc {

    function getABIEncodePacked() public view returns (bytes memory) {
        uint8 a = 1;
        string memory b = "string";
        string memory c = "string";
        uint d = 1;
        return abi.encodePacked(a, b, c, d);
    }

    function getABIEncode() public view returns (bytes memory) {
        return abi.encode("string", 1, "uint");
    }

    function getABIwtihSelector() public view returns (bytes memory) {
        bytes4 selector = bytes4(keccak256(bytes("getMsgData(uint256)")));
        return abi.encodeWithSelector(selector, 1);

    }

    function getMsgData(uint a) public view returns (bytes memory) {
        return msg.data;
    }

}
