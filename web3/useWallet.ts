
"use client"
import { injected } from 'wagmi/connectors';
import {  sepolia } from 'viem/chains';
import { useAccount, useBalance, useChainId, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { useMemo } from 'react';
import { formatEther } from 'viem';

export function useWallet(){
    const {address, isConnected, status}=useAccount();
    const chainId=useChainId();
    const {connectors,connect, isPending: isConnecting}= useConnect();
    const {disconnect}=useDisconnect();
    const {switchChain, isPending: isSwitching}= useSwitchChain();
    const {data: balance}= useBalance();
    const injectedConnector= connectors.find((c)=>c.id =="injected");
    const isWrongNetwork= isConnected && chainId!== sepolia.id;
   
    const shortAddress= useMemo(()=>
    address? `${address.slice(0,6)}...${address.slice(-4)}`:"",[]);

    const balanceEth= balance? Number(formatEther(balance.value)).toFixed(4): "0.0000";
    
    const doConnect=()=>{
        if(injectedConnector) connect({connector:injectedConnector})
    }

    return{
        address,
        shortAddress,
        balanceEth,
        isConnected,
        isConnecting,
        status,
        isWrongNetwork,
        isSwitching,
        hasInjected: !! injectedConnector,
        connect:doConnect,
        disconnect: ()=>disconnect(),
        switchToSepolia: ()=> switchChain({chainId: sepolia.id}),

    }
}