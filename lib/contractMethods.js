import "@ethersproject/shims";
import { BigNumber } from "ethers";
import Web3 from "web3";
import { getComicContractObj, getContractObj, getMethObj, getNewComicContractObj, getOgacContractObj, getOgacReadContractObj, getOgacReadContractObjWithP } from "./contract";

const METH = "0xED5464bd5c477b7F71739Ce1d741b43E932b97b0"

export async function mint(_mintAmount, provider, refto) {
  const myContract = getContractObj(provider);

  let refAddress = "0x0000000000000000000000000000000000000000";

  if(refto != null && refto !== undefined){
      refAddress = refto;
  }

  try {
    var cost;
    const c = await myContract.cost();
    cost = BigNumber.from(c);
    
    var tx = await myContract.mint(_mintAmount, {
      value: cost.mul(_mintAmount),
    });
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}



export async function mintComic(_mintAmount, provider) {
  const myContract = getNewComicContractObj(provider);

  try {
    var cost;
    const c = await myContract.cost();
    cost = BigNumber.from(c);
    var tx = await myContract.mintOgac(_mintAmount, {
      value: cost.mul(_mintAmount),
    });
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export async function mintWithMeth(_mintAmount, provider) {
  const myContract = getContractObj(provider);
  
  try {
   
  
    var tx = await myContract.mintOgacWithErc20(_mintAmount, METH, {
      value: 0,
    });
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export async function mintComicWithMeth(_mintAmount, provider) {
  const myContract = getNewComicContractObj(provider);
  
  try {
    var tx = await myContract.mintComicWithErc20(_mintAmount, METH, {
      value: 0,
    });
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export async function comicTotalSupply( provider) {
  const myContract = getNewComicContractObj(provider);
  
  try {
    var tx = await myContract.totalSupply();
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function comicCost( provider) {
  const myContract = getNewComicContractObj(provider);
  
  try {
    var tx = await myContract.cost();
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}



 




export async function getBalanceOf(account,provider) {
  const mycontract = getOgacContractObj(provider);
  try {
  
    const balanceOf = await mycontract.balanceOf(account);
     return balanceOf;
  } catch (error) {
    console.log(error);
  }
}


export async function tokenUri(id) {
  const mycontract = getOgacReadContractObj();
  try {
  
    const balanceOf = await mycontract.tokenURI(id);
     return balanceOf;
  } catch (error) {
    throw error;
    console.log(error);
  }
}

export async function getTotalSupply(provider) {
  const mycontract = getContractObj(provider);
  try {
  
    const balanceOf = await mycontract.totalSupply()
     return balanceOf;
  } catch (error) {
    console.log(error);
  }
}

export async function getPrice(provider) {
  const mycontract = getContractObj(provider);
  try {
  
    const balanceOf = await mycontract.cost()
     return balanceOf;
  } catch (error) {
    console.log(error);
  }
}

export async function isPaused(provider) {
  const mycontract = getContractObj(provider);
  try {
  
    const balanceOf = await mycontract.paused()
     return balanceOf;
  } catch (error) {
    console.log(error);
  }
}


export async function isComicPaused(provider) {
  const mycontract = getNewComicContractObj(provider);
  try {
  
    const balanceOf = await mycontract.paused()
     return balanceOf;
  } catch (error) {
    console.log(error);
  }
}


export async function methBalance(account,provider) {
  const mycontract = getMethObj(provider);
  try {
  
    const val = await mycontract.balanceOf(account)
     return val;
  } catch (error) {
    console.log(error);
  }
}

export async function methApprove(amount, provider) {
  console.log(amount);
  const mycontract = getMethObj(provider);
  try {
  
    const val = await mycontract.approve("0xD6Ac690F2C5e7cD6a11767D9Cbc7698aF94Fb2Be",amount + 1)
     return val;
  } catch (error) {
    console.log(error);
  }
}



export async function methComicApprove(amount, provider) {
  console.log(amount);
  const mycontract = getMethObj(provider);
  try {
  
    const val = await mycontract.approve("0x1b51E5eD7b034282858B86318BED08DD84Ed79e4",amount + 1)
     return val;
  } catch (error) {
    console.log(error);
  }
}



export async function methCheckAllowance(account,provider,contract="0xD6Ac690F2C5e7cD6a11767D9Cbc7698aF94Fb2Be") {
  
  const mycontract = getMethObj(provider);
  try {
  
    const val = await mycontract.allowance(account, contract)
     return val;
  } catch (error) {
    console.log(error);
  }
}

export async function methCheckAllowanceComic(account,provider) {
  
  const mycontract = getMethObj(provider);
  try {
  
    const val = await mycontract.allowance(account, "0x1b51E5eD7b034282858B86318BED08DD84Ed79e4")
     return val;
  } catch (error) {
    console.log(error);
  }
}

export  function MethGetPrice(provider) {
  return 1000;
}


export  function MethGetPriceComic() {
  return 300;
}








//comic

export async function comicIsClaimed(account, provider){
  const myContract = getNewComicContractObj(provider);
  
  try {
    var tx = await myContract.isClaimed(account);
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function claimComic(amount, proof, provider){
  const myContract = getNewComicContractObj(provider);
  
  try {
    var tx = await myContract.claimComics(amount, proof);
    return tx;
  } catch (error) {
    console.log(error);
    return false;
  }
}