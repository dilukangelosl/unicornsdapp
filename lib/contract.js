import { Contract } from "@ethersproject/contracts";
import { abi, contractAddress } from "./contractInfo";
import comic from './comic';
import meth from './methContract';
import ogac from './ogacinfo';
import comicnew from './newcomic'
import {ethers} from 'ethers';
const Web3 = require("web3");

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return `${startStr}...${endStr}`;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return `${startStr}...${endStr}`;
}

export function getContractObj(provider) {

  return new Contract(contractAddress, abi,  provider);
}


export function getComicContractObj(provider) {

  return new Contract(comic.contractAddress, comic.abi,  provider);
}

export function getNewComicContractObj(provider) {

  return new Contract(comicnew.contractAddress, comicnew.abi,  provider);
}


export function getMethObj(provider) {

  return new Contract(meth.contractAddress, meth.abi,  provider);
}

export function getOgacReadContractObj() {
  var provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/ba357cd14c9e4b6b8446d50ab4941135")
  var customHttpProvider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/ba357cd14c9e4b6b8446d50ab4941135")
  return new Contract(ogac.contractAddress, ogac.abi,  customHttpProvider);
}

export function getOgacReadContractObjWithP(provider) {
 
  return new Contract(ogac.contractAddress, ogac.abi,  provider);
}



export function getOgacContractObj(provider) {

  return new Contract(ogac.contractAddress, ogac.abi,  provider);
}

export function getContractObjWithAddress(_contractAddress, _abi, _provider) {
  
  return new Contract(_contractAddress, _abi, _provider);
}

export const shorter = (str) =>
  str?.length > 8 ? `${str.slice(0, 6)}...${str.slice(-4)}` : str;
