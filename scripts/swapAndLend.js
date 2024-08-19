const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Get the signer (your account)
    const [deployer] = await ethers.getSigners();
    
    // Define token and contract addresses
    const usdcTokenAddress = process.env.USDC_TOKEN_ADDRESS;
    const linkTokenAddress = process.env.LINK_TOKEN_ADDRESS;
    const swapContractAddress = process.env.SWAP_CONTRACT_ADDRESS;

    // Attach the swap contract
    const swapContract = await ethers.getContractAt("ISwapRouter", swapContractAddress, deployer);

    // Approve USDC tokens to be spent by the swap contract
    const usdcToken = await ethers.getContractAt("IERC20", usdcTokenAddress, deployer);
    await usdcToken.approve(swapContract.address, ethers.utils.parseUnits("100", 6)); // Approve 100 USDC

    // Execute the swap: USDC -> LINK
    const tx = await swapContract.swapExactTokensForTokens(
        ethers.utils.parseUnits("100", 6), // 100 USDC
        ethers.utils.parseUnits("1", 18),  // Minimum 1 LINK
        [usdcTokenAddress, linkTokenAddress],
        deployer.address,
        Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current time
    );

    console.log("Swap executed, transaction hash:", tx.hash);

    // Add more functionality here, e.g., deposit LINK into Aave
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
