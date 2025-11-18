import { ethers } from 'ethers';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic as bip39Validate, mnemonicToEntropy, entropyToMnemonic } from 'bip39';
import { HDKey } from '@scure/bip32';
import { Wallet } from '@ethereumjs/wallet';
import { keccak_256 } from '@noble/hashes/sha3';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';

// Types
export interface WalletResult {
  address: string;
  privateKey: string;
  mnemonic: string;
  publicKey?: string;
  path?: string;
}

export interface ExtendedWalletResult extends WalletResult {
  index: number;
  path: string;
  publicKey: string;
}

export interface EncryptionResult {
  encrypted: string;
  iv: string;
  salt: string;
}

// Mnemonic Functions
export function generateMnemonicPhrase(strength: number = 256): string {
  if (![128, 160, 192, 224, 256].includes(strength)) {
    throw new Error('Strength must be one of: 128, 160, 192, 224, 256');
  }
  return generateMnemonic(strength);
}

// Alias for backward compatibility
export const generateMnemonic = generateMnemonicPhrase;

export function validateMnemonic(mnemonic: string): boolean {
  return bip39Validate(mnemonic) && ethers.Mnemonic.isValidMnemonic(mnemonic);
}

export function getMnemonicEntropy(mnemonic: string): string {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }
  return mnemonicToEntropy(mnemonic);
}

export function mnemonicFromEntropy(entropy: string): string {
  return entropyToMnemonic(entropy);
}

// Wallet Generation Functions
export function walletFromMnemonic(mnemonic: string, path: string = "m/44'/60'/0'/0/0"): WalletResult {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }

  const seed = mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);
  const childKey = hdKey.derive(path);
  
  if (!childKey.privateKey) {
    throw new Error('Failed to derive private key');
  }

  const wallet = Wallet.fromPrivateKey(childKey.privateKey);
  
  return {
    address: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString(),
    mnemonic,
    publicKey: wallet.getPublicKeyString(),
    path
  };
}

export function walletFromMnemonicEthers(mnemonic: string, path?: string): WalletResult {
  const wallet = path 
    ? ethers.HDNodeWallet.fromPhrase(mnemonic, path)
    : ethers.HDNodeWallet.fromPhrase(mnemonic);

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic,
    publicKey: wallet.publicKey,
    path: wallet.path
  };
}

export function walletFromPrivateKey(privateKey: string): Omit<WalletResult, 'mnemonic'> {
  const wallet = new ethers.Wallet(privateKey);
  
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey
  };
}

// HD Wallet Functions
export function generateHDWallet(mnemonic: string, count: number = 10, basePath: string = "m/44'/60'/0'/0"): ExtendedWalletResult[] {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('Invalid mnemonic phrase');
  }

  const wallets: ExtendedWalletResult[] = [];
  const seed = mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);

  for (let i = 0; i < count; i++) {
    const path = `${basePath}/${i}`;
    const childKey = hdKey.derive(path);
    
    if (!childKey.privateKey) {
      throw new Error(`Failed to derive private key for path: ${path}`);
    }

    const wallet = Wallet.fromPrivateKey(childKey.privateKey);
    
    wallets.push({
      address: wallet.getAddressString(),
      privateKey: wallet.getPrivateKeyString(),
      mnemonic,
      publicKey: wallet.getPublicKeyString(),
      path,
      index: i
    });
  }

  return wallets;
}

// Alternative using ethers.js for HD wallets
export function generateHDWalletEthers(mnemonic: string, count: number = 10): ExtendedWalletResult[] {
  const wallets: ExtendedWalletResult[] = [];
  const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);

  for (let i = 0; i < count; i++) {
    const path = `m/44'/60'/0'/0/${i}`;
    const wallet = hdNode.derivePath(path);
    
    wallets.push({
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic,
      publicKey: wallet.publicKey,
      path: wallet.path,
      index: i
    });
  }

  return wallets;
}

// Main Wallet Generation
export function generateWallet(useEthers: boolean = true): WalletResult {
  const mnemonic = generateMnemonicPhrase();
  return useEthers ? walletFromMnemonicEthers(mnemonic) : walletFromMnemonic(mnemonic);
}

// Address Validation
export function isValidEthereumAddress(address: string): boolean {
  return ethers.isAddress(address);
}

export function toChecksumAddress(address: string): string {
  return ethers.getAddress(address);
}

// Private Key Validation
export function isValidPrivateKey(privateKey: string): boolean {
  try {
    new ethers.Wallet(privateKey);
    return true;
  } catch {
    return false;
  }
}

// Message Signing
export async function signMessage(message: string, privateKey: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return await wallet.signMessage(message);
}

export async function verifySignature(message: string, signature: string, address: string): Promise<boolean> {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch {
    return false;
  }
}

// Hash Functions
export function keccak256(data: string | Uint8Array): string {
  if (typeof data === 'string') {
    data = new TextEncoder().encode(data);
  }
  return bytesToHex(keccak_256(data));
}

export function hashMessage(message: string): string {
  return ethers.hashMessage(message);
}

// Encryption (Basic - for demonstration)
export async function encryptPrivateKey(privateKey: string, password: string): Promise<EncryptionResult> {
  // In a real application, use a proper encryption library like @noble/ciphers
  // This is a simplified example
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encoder.encode(privateKey)
  );

  return {
    encrypted: Buffer.from(encrypted).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    salt: Buffer.from(salt).toString('base64')
  };
}

export async function decryptPrivateKey(encryptedData: EncryptionResult, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const salt = Buffer.from(encryptedData.salt, 'base64');
  const iv = Buffer.from(encryptedData.iv, 'base64');
  const encrypted = Buffer.from(encryptedData.encrypted, 'base64');

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}

// Recovery Functions
export function recoverAddressFromSignature(message: string, signature: string): string {
  return ethers.verifyMessage(message, signature);
}

// Utility Functions
export function generateRandomBytes(length: number = 32): string {
  return ethers.hexlify(ethers.randomBytes(length));
}

export function formatPrivateKey(privateKey: string): string {
  // Ensure private key has 0x prefix and is properly formatted
  return privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
}

export function stripPrivateKeyPrefix(privateKey: string): string {
  return privateKey.startsWith('0x') ? privateKey.slice(2) : privateKey;
}

// BIP44 Path Utilities
export function getDerivationPath(accountIndex: number = 0, addressIndex: number = 0, coinType: number = 60): string {
  return `m/44'/${coinType}'/${accountIndex}'/0/${addressIndex}`;
}

// Export for use with different coin types
export {
  ethers,
  HDKey,
  Wallet as EthereumJsWallet
  // Removed the problematic export - using the alias above instead
};