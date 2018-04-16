/**
 * web3JS Contract Instance Filter Event&Logs API Script 
 * April 12th, 2018
 * Author:
 *      AlbertLin
 *      ksin751119@gmail.com
 *
 * This are examples of web3JS contract event API. The record of studing web3JS.
 * Retrieve Contract Value by using event API
 * You can find it in contracts/retrieve_value_by_watch.sol
 *
 * Environment:
 * TestRPC
 * =======
 * Don't need to wait blocks mined and unlock accounts
 *
 * Execute script:
 * $ nodejs scripts/retrieveContractValue.js
 *
 * 
 */


/* Load web3JS and connect to test environment */
const readline = require('readline-sync');
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/* Set other variable */
var abi = '[{"constant":false,"inputs":[{"name":"_value","type":"int256"}],"name":"retrieve","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"int256"}],"name":"ReturnValue","type":"event"}]'
var abiDefinition = JSON.parse(abi);
var address = readline.question("Contract Address: "); // Contract Address


/* Execute Script */
var contract = web3.eth.contract(abiDefinition);
var contractInstance = contract.at(address);
var exampleEvent = contractInstance.ReturnValue({},{"fromBlock": "0"});
exampleEvent.watch(function(err, result) {
    if (err) {
        console.log(err)
        return;
    }
  console.log(result.args._value)
})
contractInstance.retrieve.sendTransaction(7, {from: web3.eth.coinbase})

