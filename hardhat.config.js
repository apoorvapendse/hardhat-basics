/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv")
dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
console.log(ALCHEMY_API_KEY,SEPOLIA_PRIVATE_KEY)
module.exports={
    networks:{
        sepolia:{
            url:`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts:[`${SEPOLIA_PRIVATE_KEY}`]
        }
    },

    solidity:"0.8.19"
}
