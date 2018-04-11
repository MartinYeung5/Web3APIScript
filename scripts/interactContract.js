/**
 * Interact with Contract 
 *
 */

const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var abi = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
var abiDefinition = JSON.parse(abi);
var address = '0x52e14e30fa538e0ba51988ef039abb274ea8e57d'
var estimatedGas = 4700000
var fromAccount = web3.eth.accounts[0]
var toAccount = web3.eth.accounts[1]
var accountPasswd = '1'


function unlockAccount(func){
    web3.personal.unlockAccount(fromAccount, accountPasswd, function(error, result){
        if(error) {
            console.log("Unlock account failed:", error);
        } else {
            func()
        }
    });
}


function callContractFunction(){
    // Instance uses the definition to create the function
    var contract = web3.eth.contract(abiDefinition);
    var contractInstance = contract.at(address);

    // contractInstance.METHOD.call, METHOD=getNum is the function of contract
    contractInstance.getNum.call(function(error, result) {
        if (error) {
            console.log("getNum() failed:", error);
        } else {
            //result is string, not integer
            console.log("getNum():", result);
        }
    });
}

function sendContractFunction(){
    var contract = web3.eth.contract(abiDefinition);
    var contractInstance = contract.at(address);
    var txnObject = {
        from: fromAccount,
        gas: estimatedGas
    }

    // contractInstance.METHOD.sendTransaction, METHOD=setNum is the function of contract
    var parameterValue = 5 ;
    contractInstance.setNum.sendTransaction(parameterValue, txnObject, function(error, result){
        if(error){
            console.log("setNum() failed:", error);
        } else {
            console.log("Transaction hash:", result);
        }
    });
}


// Execute Script
//unlockAccount(sendContractFunction);
callContractFunction();
