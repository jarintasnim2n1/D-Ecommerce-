"use client"
import { useEffect } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ESCROW_ABI, ESCROW_ADDRESS, ESCROW_CONFIGUED } from "./contracts";
import { parseEther } from "viem";

export type BuyPhase= "idle" | "confirm"| "pending"| "success" |"error";

export function useBuyProduct (){
const {isConnected} =useAccount();
const chainId= useChainId();
const onSepolia= chainId=== sepolia.id;
const {
    writeContract,
    data: hash,
    isPending: isConfirming,
    error: writeError,
    reset
}= useWriteContract();

const {
    isLoading: isMinig,
    isSuccess,
    error:receiptError
}= useWaitForTransactionReceipt({hash});
const phase: BuyPhase= writeError || receiptError?"error": isSuccess?"success":isMinig? "pending": isConfirming? "confirm": "idle";

useEffect(()=>{
    if(phase =="success" || phase=="error"){
        const t= setTimeout(reset, 4000);
        return ()=>clearTimeout(t);
    }
},[phase, reset])

const buy= (onChainProductId: bigint, priceEth: string)=>{
    if(!isConnected || !onSepolia || !ESCROW_CONFIGUED)
        return;
    reset();

    writeContract({
        address: ESCROW_ADDRESS,
        abi:ESCROW_ABI,
        functionName:"buyProduct",
        args:[onChainProductId],
        value: parseEther(priceEth),
        chainId: sepolia.id
    })
}

return{
    buy,
    phase,
    hash,
    isReady:isConnected && onSepolia && ESCROW_CONFIGUED,
    error: writeError?? receiptError?? null,
}
}