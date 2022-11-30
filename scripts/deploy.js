const { ethers } = require("hardhat");

async function main() {
  
  //owner of contract
  const contract_Owner = await ethers.getSigners();
  console.log("deploying from address : ", contract_Owner[0].address);

  //deploying contract
  const Demotokens = await ethers.getContractFactory("Demotokens");
  console.log("Deploying contract Demotokens.. ");

  const demotokens = await Demotokens.deploy("Demotokens","DTK");
  await demotokens.deployed();
  console.log("Contract deployment address : ",demotokens.address);

} 

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
