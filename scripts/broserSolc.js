/* Example of Browser solc 
 * Include this into your HTML page 
 * <script src="http://code.dappbench.com/browser-solc.min.js" type="text/javascript"></script>
 * <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
 *
 *
*/

var source = "pragma solidity ^0.4.6; contract MyContract { uint   num; event NumberSetEvent(address indexed caller, bytes32 indexed oldNum, bytes32 indexed newNum); function getNum()  returns (uint n) { return num; } function setNum(uint n) { uint old = num; num=n; NumberSetEvent(msg.sender,bytes32(old),bytes32(num)); } function MyContract(uint x){num=x;} }";
var optimize = 1;

function doGetCompilers()  {
    BrowserSolc.getVersions(function(soljsonSources, soljsonReleases) {
        var complierVersions = []
        for (var i = 0; i < Object.keys(soljsonReleases).length; i++) {
            var compilerVersion = soljsonReleases[_.keys(soljsonReleases)[i]];
            complierVersions.push(compilerVersion);
        }
       
        // Get Complier 
        compilerVersion = complierVersions[0];
        BrowserSolc.loadVersion(compilerVersion, function(c) {
            var compiler = c;
            console.log("Solc Version Loaded: " + compilerVersion);
            
            var result = compiler.compile(source, optimize);
            
            if(result.errors && JSON.stringify(result.errors).match(/error/i)){
                console.log(result.errors);
            } else {
                var thisMap = _.sortBy(_.map(result.contracts, function(val,key) {
                    return [key,val];
                }), function(val) {
                    return -1*parseFloat(val[1].bytecode);
                });

                var abi = JSON.parse(thisMap[0][1].interface);
                var bytecode = "0x" + thisMap[0][1].bytecode;
                console.log("compiled_abidefinition: ", JSON.stringify(abi));
                console.log("bytecode: ", bytecode);
            }
        });
    });
}
