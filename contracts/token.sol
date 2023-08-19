// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

contract Token{
    string public name = "MyToken";
    string public symbol = "HH";
    uint public totalTokenCount = 5000;

    address public owner;

    //mapping that maps account address to the number of tokens it holds
    mapping(address=>uint) accountToToken;

    constructor(){
        //whoever deploys this contract will contain all the tokens initially
        accountToToken[msg.sender] = totalTokenCount;
        owner = msg.sender;
    }

    function sendTokens(address to,uint tokenCount) external{
        require(accountToToken[msg.sender]>=tokenCount,"You have less tokens than you want to transfer");
        //we will reach here after it is verified that msg.sender has more or equal no of tokens that he wants to donate
        accountToToken[msg.sender] -= tokenCount;//decrease tokens from sender
        accountToToken[to] +=tokenCount;    //add tokens into receriver's account

    }

    function checkBalance(address accountAddress) view external returns(uint){
        return (accountToToken[accountAddress]);
    }

    
}