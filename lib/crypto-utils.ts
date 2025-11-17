import { ethers } from 'ethers';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { hdkey } from 'ethereumjs-wallet';

export function generateMnemonic(): string {
  return generateMnemonic(256); // 24 words
}

export function walletFromMnemonic(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic);
  const hdWallet = hdkey.fromMasterSeed(seed);
  const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet();
  
  return {
    address: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString(),
    mnemonic
  };
}

export function validateMnemonic(mnemonic: string): boolean {
  return ethers.Mnemonic.isValidMnemonic(mnemonic);
}