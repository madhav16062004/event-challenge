//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Deleivery{
    mapping(address => uint) private available;
    event Deposit(address indexed sender, uint number);
    event Ship(address indexed sender, uint number, address indexed receiver);
    event Return(address indexed receiver, uint number ,address indexed sender);

    function deposit(address _account, uint _number) public payable {
        available[_account] += _number;
        emit Deposit(_account, _number);
    }

    function ship (address _sender, uint _number,address _receiver) public payable {
        
        require(available[_sender]>=_number,"insufficint parcel available");
            available[_receiver] += _number;
            available[_sender] -= _number;
        emit Ship(_sender, _number,_receiver);
    }

    function return_ (address _receiver, uint _number,address _sender) public payable {
        
        require(available[_receiver]>=_number,"insufficint parcel available");
            available[_sender] += _number;
            available[_receiver] -= _number;
        emit Ship(_receiver, _number,_sender);
    }

    

    function getBalance(address _address) public view returns(uint) {
        return available[_address];
    } 
}