require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path:'./.env})'});

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
    },
    goerli: {
        url: `https://eth-goerli.alchemyapi.io/v2/ALCHEMY_API_KEY`,
        accounts: [`PRIVATE_KEY`]
      }
  },
  solidity: "0.8.17",
};
