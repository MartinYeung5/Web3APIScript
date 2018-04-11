/**
 * Contract Instance Fliter Event & Logs 
 */

const Web3 = require('web3');
var abi = '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]';
var abiDefinition = JSON.parse(abi);
var address = '0x52e14e30fa538e0ba51988ef039abb274ea8e57d'
var estimatedGas = 4700000
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


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


// Execute Script
getContractEvents()
startWatchContractEvents()
