/**
 * Web3 API Test Script
 */

const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


// Web3 Listening
console.log("web3.net.listening:", web3.net.listening);
web3.net.getListening(function(error, result) {
    if(error) {
        console.log("we3.net.getListening():", error);
    } else {
        console.log("we3.net.getListening():", result);
    }
})


// Web3 PeerCount
console.log("web3.net.peerCount:", web3.net.peerCount)
web3.net.getPeerCount(function(error, result) {
    if(error) {
        console.log("web3.net.getPeerCount():", error);
    } else {
        console.log("web3.net.getPeerCount():", result);
    }
})


// Web3 Syncing
console.log("web3.eth.syncing:", web3.eth.syncing)
web3.eth.getSyncing(function(error, result) {
    if(error) {
        console.log("web3.eth.getSyncing():", error);
    } else {
        console.log("web3.eth.getSyncing():", result);
    }
})


// Web3 Mining
console.log("web3.eth.mining:", web3.eth.mining)
web3.eth.getMining(function(error, result) {
    if(error) {
        console.log("web3.eth.getMining():", error);
    } else {
        console.log("web3.eth.getMining():", result);
    }
})


// Web3 Coinbase
console.log("web3.eth.coinbase:", web3.eth.coinbase)
web3.eth.getCoinbase(function(error, result) {
    if(error) {
        console.log("web3.eth.getCoinbase():", error);
    } else {
        console.log("web3.eth.getCoinbase():", result);
    }
})


// Web3 Default Account
var defaultAccount = web3.eth.defaultAccount;
if(!defaultAccount) {
        web3.eth.defaultAccount = web3.eth.accounts[0]
        defaultAccont = web3.eth.accounts[0]
}
console.log("web3.eth.defaultAccount:", web3.eth.defaultAccount)


// Web3 GetBalance
var balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether').toFixed(2);
console.log("Sync get balance:", balance);

web3.eth.getBalance(web3.eth.accounts[0],web3.eth.defaultBlock,function(error,result){
    var bal = web3.fromWei(result,'ether').toFixed(2);
    console.log("Async get balance:", bal);
});


// Web3 Unlock
web3.personal.unlockAccount(web3.eth.accounts[0], '1', 3, function(error, result){
    if(error) {
        console.log("web3.personal.unlockAccount():", error);
    } else {
        console.log("web3.personal.unlockAccount():", result);
    }
})


// Web3 Lock
web3.personal.lockAccount(web3.eth.accounts[0], '1', function(error, result){
    if(error) {
        console.log("Async web3.personal.lockAccount():", error);
    } else {
        console.log("Async web3.personal.lockAccount():", result);
    }
})
var result = web3.personal.lockAccount(web3.eth.accounts[0], '1');
console.log("Sync web3.personal.lockAccount():", result);











