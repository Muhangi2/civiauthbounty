import { userHasWallet } from "@civic/auth-web3";
import { useUser } from '@civic/auth-web3/react';
import { embeddedWallet } from "@civic/auth-web3";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, useAccount, useConnect, useBalance, http } from 'wagmi';
import { embeddedWallet, userHasWallet } from '@civic/auth-web3';
import { CivicAuthProvider, UserButton, useUser } from '@civic/auth-web3/react';
import { mainnet, sepolia } from "wagmi/chains";

export const afterLogin = async () => {
  const userContext = await useUser();

  if (userContext.user && !userHasWallet(userContext)) {
    await userContext.createWallet();
  }
};
const wagmiConfig = createConfig({
    chains: supportedChains,
    transports: transports,
    connectors: [
      embeddedWallet(),
    ],
  });