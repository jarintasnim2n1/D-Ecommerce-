const REGISTRY:Record<string, bigint>={
    // frontend code 
}

export function getOnChainProductId(frontendId : string):bigint | undefined{
    return REGISTRY[frontendId]
}