import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, useAccount, useConnect, useBalance, http } from 'wagmi';
import { embeddedWallet, userHasWallet } from '@civic/auth-web3';
import { CivicAuthProvider, UserButton, useUser } from '@civic/auth-web3/react';
import { mainnet, sepolia } from "wagmi/chains";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Configure Wagmi
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    embeddedWallet(),
  ],
});

const styles = {
  container: {
    padding: '1rem',
  },
  buttonContainer: {
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  },
  connectButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  walletInfo: {
    fontFamily: 'monospace',
    marginTop: '1rem',
  },
  connectedStatus: {
    color: '#27ae60',
    fontWeight: 'bold',
  }
};

// Content component that uses the hooks
const AppContent = () => {
  const userContext = useUser();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const balance = useBalance({
    address: userHasWallet(userContext) ? userContext.walletAddress as `0x${string}` : undefined,
  });

  const connectExistingWallet = () => {
    connect({
      connector: connectors[0],
    });
  };

  const createWallet = async () => {
    if (userContext.user && !userHasWallet(userContext)) {
      await userContext.createWallet();
      connectExistingWallet();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <UserButton />
      </div>
      
      {userContext.user && (
        <div>
          {!userHasWallet(userContext) && (
            <button 
              onClick={createWallet}
              style={styles.button}
            >
              Create Wallet
            </button>
          )}
          
          {userHasWallet(userContext) && (
            <div>
              <p style={styles.walletInfo}>Wallet address: {userContext.walletAddress}</p>
              <p>
                Balance:{' '}
                {balance?.data
                  ? `${(BigInt(balance.data.value) / BigInt(1e18)).toString()} ${balance.data.symbol}`
                  : 'Loading...'}
              </p>
              
              {!isConnected && (
                <button 
                  onClick={connectExistingWallet}
                  style={styles.connectButton}
                >
                  Connect Wallet
                </button>
              )}
              
              {isConnected && (
                <p style={styles.connectedStatus}>Wallet is connected</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main App component with providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <CivicAuthProvider clientId="4ceb8ea1-7b12-4a14-8fd9-c340ae067e02">
          <AppContent />
        </CivicAuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;