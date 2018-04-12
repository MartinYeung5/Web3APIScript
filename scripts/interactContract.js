/**
 * web3JS Interact Contract API Script 
 * April 12th, 2018
 * Author:
 *      AlbertLin
 *      ksin751119@gmail.com
 *
 * This are examples of web3JS interact contract API. The record of studing web3JS.
 * You can find the sample.sol in contracts.
 *
 * Environment:
 * TestRPC (Don't need to wait blocks mined and unlock accounts)
 *
 * Execute script:
 * $ nodejs scripts/interactContract.js
 *
 */

/* Load web3JS and connect to test environment */
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/* Set run environment */
var fromAccount = web3.eth.accounts[0]     
var toAccount = web3.eth.accounts[1]

/* Set other variable */
var abi = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
var abiDefinition = JSON.parse(abi);
var address = '0x52e14e30fa538e0ba51988ef039abb274ea8e57d'  //Contract Address
var estimatedGas = 4700000


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


/* Execute Script */
callContractFunction();
//sendContractFunction();
