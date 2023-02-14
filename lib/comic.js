const contract = {
    contractAddress: "0xf7269D6e9fEEa73e30936118A6A3A63a1E30CB3F",
    abi: [
      {
        inputs: [
          { internalType: "address payable", name: "receiver", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ],
  };
  
  module.exports = contract;
  