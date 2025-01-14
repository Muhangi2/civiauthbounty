import { useConnect, useAccount, useBalance } from 'wagmi';
import { useUser } from '@civic/auth-web3/react';
import { userHasWallet } from '@civic/auth-web3';

export const useWallet = () => {
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

  return {
    userContext,
    balance,
    isConnected,
    connectExistingWallet,
    createWallet,
    hasWallet: userHasWallet(userContext),
  };
};