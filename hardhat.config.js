require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
};
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Ensure to import dotenv if using environment variables

module.exports = {
  solidity: "0.8.18",  // Specify your Solidity version
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Infura URL with your Project ID
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Your private key for deployment
    },
  },
};
