/**
 * web3JS Contract Instance Filter Event&Logs API Script 
 * April 12th, 2018
 * Author:
 *      AlbertLin
 *      ksin751119@gmail.com
 *
 * This are examples of web3JS filer event API. The record of studing web3JS.
 * You can find the sample.sol in contracts.
 *
 * Environment:
 * TestRPC
 * =======
 * Don't need to wait blocks mined and unlock accounts
 *
 * Execute script:
 * $ nodejs scripts/eventFilter.js
 *
 * Return:
 * Result example of filter get log 
 * [{
 *   address:'0x52e14e30fa538e0ba51988ef039abb274ea8e57d',
 *   topics:[
 *      '0x108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce',
 *      '0x000000000000000000000000c78f884f551036f1510fd81fd0bd9d407f3fae50',
 *      '0x0000000000000000000000000000000000000000000000000000000000000005',
 *      '0x0000000000000000000000000000000000000000000000000000000000000005'
 *   ],
 *   data:'0x',
 *   blockNumber:464,
 *   transactionHash:'0x6ebf824973834bf841d03f5e0d1c07c09b8d4238589b900198e5cca77053bee7',
 *   transactionIndex:1,
 *   blockHash:'0xfa6f7f7357169a1cef4db479da96c2b9471c9b888b11b29a335d7b6e4d9cc11d',
 *   logIndex:1,
 *   removed:false
 * }]
 *
 */


/* Load web3JS and connect to test environment */
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

/* Set other variable */
var address = '0x52e14e30fa538e0ba51988ef039abb274ea8e57d'; //Contract Address
var estimatedGas = 4700000;
var filterWatch;


function getHashEventSignature(evt){
    return web3.sha3(evt)
}


function getOptionObject(){
    var options = {
        "fromBlock": "0",
        "toBlock": "latest",
        "address": address,
        "topics": [ 
            event_sig,
            null,
            null,
            "0x0000000000000000000000000000000000000000000000000000000000000005"
        ]
    }
    return options
}


function getFilterEvents(){
    //event NumberSetEvent(address indexed caller, bytes32 indexed oldNum, bytes32 indexed newNum);
    event_sig = getHashEventSignature('NumberSetEvent(address,bytes32,bytes32)');
    var options = getOptionObject()
    var filterGet = web3.eth.filter(options);
    filterGet.get(function(error, result){
        if(error){
            console.log('Get filter log error:',error);
        } else {
            for(var i = 0; i < result.length ; i++){
                console.log(result[i]);
            }
        }
    });
}


function startWatchFilterEvents(){
    //event NumberSetEvent(address indexed caller, bytes32 indexed oldNum, bytes32 indexed newNum);
    event_sig = getHashEventSignature('NumberSetEvent(address,bytes32,bytes32)');
    var options = getOptionObject()
    filterWatch = web3.eth.filter(options);
    filterWatch.watch(function(error, result){
        if(error){
            console.log('Watch filter log error:',error);
        } else {
            console.log(result);
        }
    });

}


/* If you want to Stop Watch doFilterStopWatching(filterWatch) */
function stopWatchFilterEvents(filterWatch){
    if(filterWatch){
        filterWatch.stopWatching();
        filterWatch = undefined;
    }
}


/* Execute Script */
getFilterEvents()
//startWatchFilterEvents()
