//minting tokens for owner
const {ethers} = require("hardhat");

async function main(){
    const contract_instance = "0x2A5A9FfcE302D1dd80DFe3D8efD6c09836C58077";
    const demotokens = await ethers.getContractAt("Demotokens",contract_instance)
    const accounts = await ethers.getSigners();

    //minting 10 tokens to contract owner
    console.log("Minting new NFT...");
    const owner = accounts[0].address;
    const mintCount = 5;
    let initialMint = []

    for (let i = 0; i < mintCount; i++) {
        let tx = await demotokens.safeMint(owner, i.toString()); //calling mint function
        await tx.wait(); //waiting for transation to go thru
        initialMint.push([owner,i.toString()]);
    }

    console.log(`${mintCount} NFT minted to : ${owner}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  