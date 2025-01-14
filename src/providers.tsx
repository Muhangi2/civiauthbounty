import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { wagmiConfig } from "./wagmi";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthProvider clientId="4ceb8ea1-7b12-4a14-8fd9-c340ae067e02">
          {children}
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};
