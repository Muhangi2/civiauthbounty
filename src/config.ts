import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, optimism, arbitrum } from 'wagmi/chains'
// import { createPublicClient } from 'viem'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http()
  },
})