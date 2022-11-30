const {ethers} = require("hardhat");

async function main(){
    const contract_instance = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const demotokens = await ethers.getContractAt("Demotokens",contract_instance)
    const accounts = await ethers.getSigners();
    
    //tranfering token from owner to accounts[1]
    const owner = accounts[0];
    const reciever = `0x63DAc31bF8c2C972903f2bc303a502587268954d`;
    console.log("Trasferring NFT to : ",reciever);
    await demotokens.transferFrom(owner.address,reciever,"0");
    console.log("Transfer complete.");
} 
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  