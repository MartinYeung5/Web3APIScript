/**
 * Deploy Contract Example
 */

const Web3 = require('web3');
const readline = require('readline-sync');

var bytecode = '0x6060604052341561000f57600080fd5b60405160208061013d833981016040528080516000555050610107806100366000396000f30060606040526004361060485763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166367e0badb8114604d578063cd16ecbf14606f575b600080fd5b3415605757600080fd5b605d6084565b60405190815260200160405180910390f35b3415607957600080fd5b6082600435608a565b005b60005490565b6000805490829055818173ffffffffffffffffffffffffffffffffffffffff33167f108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce60405160405180910390a450505600a165627a7a7230582080b19068d04b58da7a7a1d6c79dae37ad5dbfbccc3996f9b427d21345b0bea750029';
var abi = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
var gas = 4700000;
var accountPasswd = '1'
var abiDefinition = JSON.parse(abi);
var fromAccount = web3.eth.accounts[0]
var toAccount = web3.eth.accounts[1]
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));



function unlockAccount(func){
    web3.personal.unlockAccount(fromAccount, accountPasswd, function(error, result){
        if(error) {
            console.log("Unlock account failed:", error);
        } else {
            func()
        }
    });
}


function deployContract() {
    var  contractInstance = web3.eth.contract(abiDefinition);
    var params = {
        from: fromAccount,
        data: bytecode,
        gas: gas
    }
    var constructor_param = 10;

    contractInstance.new(constructor_param, params, function(error, result){
        if(error) {
            console.log('Deploy contract failed:', error);
        } else {
            if(result.address){
                console.log("Contract address:", result.address);
            } else {
                console.log("Contract transaction hash:", result.transactionHash);
            }
        }
    });
}


function deployContractBySendTransaction() {
    var contract = web3.eth.contract(abiDefinition);
    var conData = contract.new.getData(10, {data: bytecode})
    var txnObject = {
        from: web3.eth.accounts[0],
        data: conData,
    }

    web3.eth.sendTransaction(txnObject, function(error, result) {
        if(error) {
            console.log("Send transaction failed:", error);
        } else {
            var txn_hash = result
            console.log("Transaction hash:", txn_hash);
            readline.question("Enter to continue if block is mined");

            web3.eth.getTransactionReceipt(txn_hash, function(error, result){
                if(error) {
                    console.log("Get transaction recepit error:", error);
                } else {
                    console.log("Get transaction recepit result:", result);
                }
            })
        }
    });
}


// Execute Script
unlockAccount(deployContract);
//unlockAccount(deployContractBySendTransaction);
