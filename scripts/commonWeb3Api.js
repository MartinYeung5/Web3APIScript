/**
 * web3JS API Script 
 * April 12th, 2018
 * Author:
 *      AlbertLin
 *      ksin751119@gmail.com
 *
 * This are examples of web3JS API. The record of studing web3JS.
 *
 * Environment:
 * =======
 * Don't need to wait blocks mined and unlock accounts
* 
 * Execute script:
 * $ nodejs scripts/commonWeb3Api.js
 *
 */


/* Load web3JS and connect to test environment */
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


/* Web3 Version */
console.log("web3.version.api:",web3.version.api);
console.log("web3.version.network:",web3.version.network);
console.log("web3.version.ethereum:",web3.version.ethereum);
web3.version.getNode(function(error, result){
    if(error){
        console.log("web3.version.getNode() error:", error);
    } else {
        console.log("web3.version.getNode() result:", result);
    };
});


/* Web3 Listening */
console.log("web3.net.listening:", web3.net.listening);
web3.net.getListening(function(error, result) {
    if(error) {
        console.log("we3.net.getListening():", error);
    } else {
        console.log("we3.net.getListening():", result);
    }
});


/* Web3 PeerCount */
console.log("web3.net.peerCount:", web3.net.peerCount)
web3.net.getPeerCount(function(error, result) {
    if(error) {
        console.log("web3.net.getPeerCount():", error);
    } else {
        console.log("web3.net.getPeerCount():", result);
    }
});


/* Web3 Syncing */
console.log("web3.eth.syncing:", web3.eth.syncing)
web3.eth.getSyncing(function(error, result) {
    if(error) {
        console.log("web3.eth.getSyncing():", error);
    } else {
        console.log("web3.eth.getSyncing():", result);
    }
});


/* Web3 Mining */
console.log("web3.eth.mining:", web3.eth.mining)
web3.eth.getMining(function(error, result) {
    if(error) {
        console.log("web3.eth.getMining():", error);
    } else {
        console.log("web3.eth.getMining():", result);
    }
});


/* Web3 Coinbase */
console.log("web3.eth.coinbase:", web3.eth.coinbase)
web3.eth.getCoinbase(function(error, result) {
    if(error) {
        console.log("web3.eth.getCoinbase():", error);
    } else {
        console.log("web3.eth.getCoinbase():", result);
    }
});


/* Web3 Default Account */
var defaultAccount = web3.eth.defaultAccount;
if(!defaultAccount) {
        web3.eth.defaultAccount = web3.eth.accounts[0];
        defaultAccont = web3.eth.accounts[0];
}
console.log("web3.eth.defaultAccount:", web3.eth.defaultAccount);


/* Web3 GetBalance */
var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether').toFixed(2);
console.log("Sync get balance:", balance);

web3.eth.getBalance(web3.eth.accounts[0],web3.eth.defaultBlock,function(error,result){
//web3.eth.getBalance(web3.eth.accounts[0],,function(error,result){
    var bal = web3.fromWei(result,'ether').toFixed(2);
    console.log("Async get balance:", bal);
});



/* Only for Geth Node 
// Web3 Unlock
web3.personal.unlockAccount(account, passwd, 3, function(error, result){
    if(error) {
        console.log("web3.personal.unlockAccount():", error);
    } else {
        console.log("web3.personal.unlockAccount():", result);
    }
})

// Web3 Lock
web3.personal.lockAccount(account, passwd, function(error, result){
    if(error) {
        console.log("Async web3.personal.lockAccount():", error);
    } else {
        console.log("Async web3.personal.lockAccount():", result);
    }
})
var result = web3.personal.lockAccount(account, passwd);
console.log("Sync web3.personal.lockAccount():", result);
*/
