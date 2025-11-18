import { ethers } from 'ethers';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic as bip39Validate } from 'bip39';
import { HDKey } from '@scure/bip32';
import { Wallet } from '@ethereumjs/wallet';

// Generate a mnemonic (24 words)
export function generateMnemonicPhrase(): string {
  return generateMnemonic(256); // 256 bits = 24 words
}

// Create wallet from mnemonic
export function walletFromMnemonic(mnemonic: string) {
  // Validate mnemonic first
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }

  const seed = mnemonicToSeedSync(mnemonic);
  
  // Using @scure/bip32 for HD key derivation (modern approach)
  const hdKey = HDKey.fromMasterSeed(seed);
  const childKey = hdKey.derive("m/44'/60'/0'/0/0");
  
  if (!childKey.privateKey) {
    throw new Error('Failed to derive private key');
  }

  // Create wallet using @ethereumjs/wallet
  const wallet = Wallet.fromPrivateKey(childKey.privateKey);
  
  return {
    address: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString(),
    mnemonic
  };
}

// Alternative using only ethers.js (recommended)
export function walletFromMnemonicEthers(mnemonic: string) {
  if (!ethers.Mnemonic.isValidMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }

  const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic,
    publicKey: wallet.publicKey
  };
}

// Validate mnemonic
export function validateMnemonic(mnemonic: string): boolean {
  return bip39Validate(mnemonic) && ethers.Mnemonic.isValidMnemonic(mnemonic);
}

// Generate a complete wallet
export function generateWallet() {
  const mnemonic = generateMnemonicPhrase();
  return walletFromMnemonicEthers(mnemonic);
}