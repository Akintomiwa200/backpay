import { ethers } from 'ethers';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic as bip39Validate } from 'bip39';
import { HDKey } from '@scure/bip32';
import { Wallet } from '@ethereumjs/wallet';

export function generateMnemonicPhrase(): string {
  return generateMnemonic(256); // 24 words
}

export function walletFromMnemonic(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);
  const childKey = hdKey.derive("m/44'/60'/0'/0/0");
  
  if (!childKey.privateKey) {
    throw new Error('Failed to derive private key');
  }

  const wallet = Wallet.fromPrivateKey(childKey.privateKey);
  
  return {
    address: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString(),
    mnemonic
  };
}

// Alternative using only ethers.js (recommended)
export function walletFromMnemonicEthers(mnemonic: string) {
  const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic);

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic,
    publicKey: wallet.publicKey
  };
}

export function validateMnemonic(mnemonic: string): boolean {
  return bip39Validate(mnemonic) && ethers.Mnemonic.isValidMnemonic(mnemonic);
}

// Generate wallet using ethers.js (simpler approach)
export function generateWallet() {
  const mnemonic = generateMnemonicPhrase();
  return walletFromMnemonicEthers(mnemonic);
}