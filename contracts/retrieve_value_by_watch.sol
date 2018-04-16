pragma solidity ^0.4.6;

contract RetrieveContract {
    event ReturnValue(address indexed _from, int256 _value);
    function retrieve(int256 _value) returns (int256) {
        ReturnValue(msg.sender, _value);
        return _value;
    }
}

