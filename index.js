// const {Web3} = require('web3');
// const axios = require("axios");

// const pancakeSwapAddress = "0xC75650fe4D14017b1e12341A97721D5ec51D5340";

// const a  = async () => 
// {
//     const response = await axios.get("https://api.bscscan.com/api?module=contract&action=getabi&address=0xC75650fe4D14017b1e12341A97721D5ec51D5340")    
//     const pancakeSwapABI = JSON.parse(response.data.result);
//     console.log(pancakeSwapABI)
    
//     // const provider = new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org');
//     // const web3 = new Web3(provider);
//     // // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
//     // const pancakeSwap = new web3.eth.Contract([pancakeSwapABI], pancakeSwapAddress);

//     // const bnbPrice = await pancakeSwap.methods.getReserves().call();
//     // const bitcoinPrice = bnbPrice / 100000000 * bnbBtcRatio;
//     // console.log(`Bitcoin price: $${bitcoinPrice}`);




//     // const response = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${pancakeSwapAddress}`);
//     // const data = await response.json();
    
//     // const abi = JSON.parse(data.result);
    
//     // console.log(abi)
// }

// a()

const Big = require("big.js");
const blk = require("./blockchain");
const UniswapV2Pair = require("./abi/IUniswapV2Pair.json");


const PAIR_ADDR = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852";
const PAIR_NAME = "ETH/USDC";
const interval = 10000;

//Create web3 contract
const PairContractHttp = new blk.web3http.eth.Contract(UniswapV2Pair.abi, PAIR_ADDR);

const getReserves = async(ContractObj) =>
{
    const _reserves = await ContractObj.methods.getReserves().call();
    return [Big(_reserves.reserve0), Big(_reserves.reserve1)];
}

const sleep = async (timeInMs) =>
{
    new Promise((resolve) => setTimeout(resolve, timeInMs));
}

const delay = (timeInMs) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeInMs); 
    });
  }
  

const main = async () =>
{
    while (true)
    {
        const [amtToken0, amtToken1] = await getReserves(PairContractHttp);

        console.log(
            `Price ${PAIR_NAME}: ${amtToken0.div(amtToken1).toString()}`
        );
        await delay(interval);
        // setTimeout(interval);
        // await sleep(interval);
    }
}

main();