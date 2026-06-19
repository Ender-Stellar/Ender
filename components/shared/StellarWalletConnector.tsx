import React, { useState, useEffect } from 'react';
import { Networks } from 'stellar-sdk';
import { useStellarWallet } from '@/hooks/useStellarWallet';

export const StellarWalletConnector: React.FC = () => {
  const { address, network, connectFreighter, connectAlbedo, switchNetwork, balance, loading } = useStellarWallet();

  return (
    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Stellar Wallet</h2>
      {address ? (
        <div className="space-y-2">
          <p className="break-all"><span className="font-medium">Address:</span> {address}</p>
          <p><span className="font-medium">Network:</span> {network}</p>
          <p><span className="font-medium">Balance:</span> {balance ?? '...'} XLM</p>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition"
              onClick={() => switchNetwork(network === Networks.PUBLIC ? Networks.TESTNET : Networks.PUBLIC)}
              disabled={loading}
            >
              Switch to {network === Networks.PUBLIC ? 'Testnet' : 'Public'}
            </button>
            <button
              className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition"
              onClick={() => window.location.reload()}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <button
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
            onClick={connectFreighter}
          >
            Connect Freighter
          </button>
          <button
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
            onClick={connectAlbedo}
          >
            Connect Albedo
          </button>
        </div>
      )}
    </div>
  );
};
