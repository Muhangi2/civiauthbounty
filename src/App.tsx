import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  createConfig,
 
  http,
} from "wagmi";
import { embeddedWallet,  } from "@civic/auth-web3";

import { CivicAuthProvider, } from "@civic/auth/react";
import { mainnet, sepolia } from "wagmi/chains";
// import { CivicAuthProvider } from "@civic/auth/react";
import { TitleBar } from "./page/landing";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [embeddedWallet()],
});

// Wagmi requires react-query
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <CivicAuthProvider clientId="4ceb8ea1-7b12-4a14-8fd9-c340ae067e02">
            <TitleBar />
          </CivicAuthProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
