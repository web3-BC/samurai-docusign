import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    arbitrumGoerli: {
      url: `${process.env.ALCHEMY_GOERLI_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: `${process.env.ALCHEMY_MUMBAI_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      allowUnlimitedContractSize: true,
    },
    scrollSepoila: {
      url: "https://1rpc.io/scroll/sepolia",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;
