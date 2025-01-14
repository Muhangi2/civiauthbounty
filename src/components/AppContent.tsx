import { UserButton } from '@civic/auth-web3/react';
import { useWallet } from '../hooks/useWallet';

export const AppContent = () => {
  const {
    userContext,
    balance,
    isConnected,
    connectExistingWallet,
    createWallet,
    hasWallet,
  } = useWallet();

  return (
    <div className="p-4">
      <div className="mb-4">
        <UserButton />
      </div>
      
      {userContext.user && (
        <div className="space-y-4">
          {!hasWallet && (
            <button 
              onClick={createWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Wallet
            </button>
          )}
          
          {hasWallet && (
            <div className="space-y-2">
              {/* <p className="font-mono">Wallet address: {userContext.walletAddress}</p> */}
              <p>
                Balance:{' '}
                {balance?.data
                  ? `${(BigInt(balance.data.value) / BigInt(1e18)).toString()} ${balance.data.symbol}`
                  : 'Loading...'}
              </p>
              
              {!isConnected && (
                <button 
                  onClick={connectExistingWallet}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Connect Wallet
                </button>
              )}
              
              {isConnected && (
                <p className="text-green-600 font-semibold">Wallet is connected</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};