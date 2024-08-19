const { ethers } = require("hardhat");

async function main() {
    const SwapContract = await ethers.getContractFactory("YourContract");
    const swapContract = await SwapContract.deploy();

    await swapContract.deployed();
    console.log("SwapContract deployed to:", swapContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
