
function unlockAccount(func, account, passwd){
    web3.personal.unlockAccount(account, passwd, function(error, result){
        if(error) {
            console.log("Unlock account failed:", error);
        } else {
            func()
        }
    });
}

