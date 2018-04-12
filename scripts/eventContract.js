/**
 * web3JS Contract Instance Filter Event&Logs API Script 
 * April 12th, 2018
 * Author:
 *      AlbertLin
 *      ksin751119@gmail.com
 *
 * This are examples of web3JS contract event API. The record of studing web3JS.
 * You can find the sample.sol in contracts.
 *
 * Environment:
 * TestRPC
 * =======
 * Don't need to wait blocks mined and unlock accounts
 *
 * Execute script:
 * $ nodejs scripts/eventContract.js
 *
 * Return:
 * Result example of contract get event
 * [{ 
 *   logIndex: 0,
 *   transactionIndex: 0,
 *   transactionHash: '0x886f258c7a84c61e06e69ee1c10cc0333ca01394eda77bef8e6ca54f4ae22b6b',
 *   blockHash: '0x7a53312b015ebe12f38c3c5c11c7da96fc27c7e3b5bd754553cf07e39fd2c960',
 *   blockNumber: 5,
 *   address: '0xf23578a726c37a713faaa9eaa05734d2b30593b1',
 *   type: 'mined',
 *   event: 'NumberSetEvent',
 *   args: 
 *   { 
 *      caller: '0x4f653b6ef76e9e48fca36d3063695f7a48af354b',
 *      oldNum: '0x0000000000000000000000000000000000000000000000000000000000000005',
 *      newNum: '0x0000000000000000000000000000000000000000000000000000000000000005' 
 *   }
 * }]
 * 
 */


/* Load web3JS and connect to test environment */
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/* Set other variable */
var abi = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
var abiDefinition = JSON.parse(abi);
var address = '0x52e14e30fa538e0ba51988ef039abb274ea8e57d'  //Contract Address
var estimatedGas = 4700000


function createContractEventInstance(){
    var contract = web3.eth.contract(abiDefinition);
    var contractInstance = contract.at(address);
    var additionalFilterOptions = {
        "fromBlock": "0",
        "toBlock": "latest"
    }
    //event NumberSetEvent(address indexed caller, bytes32 indexed oldNum, bytes32 indexed newNum);
    var indexedEventValues = {
        "newNum": "0x0000000000000000000000000000000000000000000000000000000000000005"
    }
    //contractInstance.EVENT_NAME, NumberSetEvent is EVENT_NAME
    return contractInstance.NumberSetEvent(indexedEventValues, additionalFilterOptions);
}


function getContractEvents() {
    var event = createContractEventInstance();
    event.get(function(error, result){
        if(error){
            console.log("Get event error:", error)
        } else {
            for(var i = 0; i < result.length ; i++){
                console.log(result[i]);
            }
        }
    });
}

function startWatchContractEvents() {
    var event = createContractEventInstance();
    event.watch(function(error, result){
        if(error){
            console.log("Get event error:", error)
        } else {
            console.log(result);
        }
    });
}


/* Execute Script */
getContractEvents()
startWatchContractEvents()
