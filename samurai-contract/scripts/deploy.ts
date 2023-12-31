import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.getContractFactory("ContractManager");
  const Contract = await contract.deploy();

  const deployedContract = await Contract.waitForDeployment();

  console.log(`deployed contract: ${await deployedContract.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
