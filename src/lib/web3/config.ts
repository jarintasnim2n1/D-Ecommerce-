
import { configureStore } from '@reduxjs/toolkit';
import {webSocket, createConfig, http, fallback} from "wagmi";
import {sepolia} from "wagmi/chains";
import {injected} from "wagmi/connectors";
const httpRpc= process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? "https://rpc.sepolia.org";

const wsRpc=  process.env.NEXT_PUBLIC_SEPOLIA_WS_URL;

const transport= wsRpc? fallback([webSocket(wsRpc),http(httpRpc)]): http(httpRpc);

export const wagmiConfig= createConfig({
    chains:[sepolia],
    connectors: [
        injected({shimDisconnect:true})
    ],
    transports: {[sepolia.id]:transport},
    ssr:true,
})

declare module "wagmi"{
    interface Register{
        configureStore: typeof wagmiConfig;
    } 
}