// import { ESCROW_ADDRESS } from './contracts';
export const ESCROW_ADDRESS=(process.env.NEXT_PUBLIC_ADDRESS??"0x000000000000000") as `0x${string}`;

export const ESCROW_CONFIGUED=ESCROW_ADDRESS.toLowerCase()!= "0x00000000000000";
export const ESCROW_ABI= [];