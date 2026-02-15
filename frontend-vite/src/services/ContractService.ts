/**
 * Vendor Qualification Smart Contract Integration
 * Real Contract Address: 2aa78f99159e7662a1fe3658f402ef4e64ff77c8769cb07368ac1702696301f8
 * 
 * This module provides integration with the deployed Midnight smart contract
 * Implements all 4 circuits from blinding.compact
 */

// ============================================================================
// CONTRACT CONFIGURATION
// ============================================================================

export const CONTRACT_CONFIG = {
  // Real deployed contract address from deployment.json
  ADDRESS: '2aa78f99159e7662a1fe3658f402ef4e64ff77c8769cb07368ac1702696301f8',
  NETWORK: 'midnight-testnet',
  DEPLOYED_AT: '2026-02-14T10:02:32.337Z',
  SEED: '1d9e3b1b189456b336ce58febc602f8be2aec4db9bbb711b7c4aeaca2d97b91b'
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface VerifyQualificationParams {
  vendorScore: number;
  minimumThreshold: number;
  salt: number | bigint;
}

export interface CheckComplianceParams {
  certificationValid: boolean;
  insuranceActive: boolean;
  paymentHistoryGood: boolean;
}

export interface SmartContractResponse {
  method: string;
  params?: any;
  result?: any;
  contractCall?: {
    circuit: string;
    input: string;
    output: string;
    [key: string]: any;
  };
  error?: string;
  timestamp: string;
  contractAddress: string;
  transactionHash?: string;
  gasUsed?: string;
}

// ============================================================================
// CONTRACT SERVICE CLASS
// ============================================================================

/**
 * Smart Contract Service
 * Manages all interactions with the Vendor Qualification contract
 */
export class VendorQualificationService {
  private contractAddress: string;
  private contractInstance: any | null = null;

  constructor(contractAddress: string = CONTRACT_CONFIG.ADDRESS) {
    this.contractAddress = contractAddress;
  }

  /**
   * Attach an instantiated Midnight contract so all calls hit the chain directly
   */
  bindContractInstance(instance: any) {
    this.contractInstance = instance;
  }

  private getContractOrThrow() {
    if (!this.contractInstance) {
      throw new Error('Contract instance not attached. Call bindContractInstance() with a real Midnight contract.');
    }

    return this.contractInstance;
  }

  /**
   * Verify vendor meets minimum quality threshold (Circuit 1)
   * Implements ZK proof: vendorScore >= minimumThreshold
   */
  async verifyQualification(params: VerifyQualificationParams): Promise<SmartContractResponse> {
    const { vendorScore, minimumThreshold, salt } = params;
    
    try {
      const contract = this.getContractOrThrow();
      const result = await contract.verifyQualification(
        vendorScore,
        minimumThreshold,
        salt
      );

      return {
        method: 'verifyQualification',
        params: {
          vendorScore,
          minimumThreshold,
          salt: salt.toString(),
        },
        result: Array.isArray(result) ? result[0] : result,
        contractCall: {
          circuit: 'verifyQualification',
          input: `[${vendorScore}, ${minimumThreshold}, ${salt}]`,
          output: Array.isArray(result) ? `[${result[0]}]` : JSON.stringify(result),
          zkProof: `Proves vendorScore (${vendorScore}) >= minimumThreshold (${minimumThreshold}) without revealing score`,
          privacyLevel: 'FULL_ZERO_KNOWLEDGE'
        },
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress,
        transactionHash: result?.transactionHash,
        gasUsed: result?.gasUsed?.toString()
      };
    } catch (error) {
      return {
        method: 'verifyQualification',
        params,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress
      };
    }
  }

  /**
   * Check compliance without revealing individual details (Circuit 2)
   * All requirements must pass
   */
  async checkCompliance(params: CheckComplianceParams): Promise<SmartContractResponse> {
    const { certificationValid, insuranceActive, paymentHistoryGood } = params;
    
    try {
      const contract = this.getContractOrThrow();
      const result = await contract.checkCompliance(
        certificationValid,
        insuranceActive,
        paymentHistoryGood
      );

      return {
        method: 'checkCompliance',
        params,
        result: Array.isArray(result) ? result[0] : result,
        contractCall: {
          circuit: 'checkCompliance',
          input: `[${certificationValid}, ${insuranceActive}, ${paymentHistoryGood}]`,
          output: Array.isArray(result) ? `[${result[0]}]` : JSON.stringify(result),
          logic: `certification AND insurance AND paymentHistory`,
          criteria: {
            certification: certificationValid ? '✓' : '✗',
            insurance: insuranceActive ? '✓' : '✗',
            paymentHistory: paymentHistoryGood ? '✓' : '✗'
          },
          privacyLevel: 'FULL_ZERO_KNOWLEDGE'
        },
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress,
        transactionHash: result?.transactionHash,
        gasUsed: result?.gasUsed?.toString()
      };
    } catch (error) {
      return {
        method: 'checkCompliance',
        params,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress
      };
    }
  }

  /**
   * Record vendor qualification in public ledger (Circuit 3)
   */
  async recordQualification(vendorId: number): Promise<SmartContractResponse> {
    try {
      const contract = this.getContractOrThrow();
      const result = await contract.recordQualification(vendorId);

      return {
        method: 'recordQualification',
        params: { vendorId },
        contractCall: {
          circuit: 'recordQualification',
          input: `[${vendorId}]`,
          output: Array.isArray(result) ? JSON.stringify(result) : 'Vendor marked as qualified',
          ledgerUpdate: `vendors.markQualified(${vendorId})`,
          privacyLevel: 'PUBLIC',
          note: 'This is a public transaction visible on-chain'
        },
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress,
        transactionHash: result?.transactionHash,
        gasUsed: result?.gasUsed?.toString()
      };
    } catch (error) {
      return {
        method: 'recordQualification',
        params: { vendorId },
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress
      };
    }
  }

  /**
   * Check if vendor is qualified - yes/no only (Circuit 4)
   * No details revealed, maintains privacy
   */
  async isVendorQualified(vendorId: number): Promise<SmartContractResponse> {
    try {
      const contract = this.getContractOrThrow();
      const result = await contract.isVendorQualified(vendorId);
      const qualified = Array.isArray(result) ? result[0] : result;

      return {
        method: 'isVendorQualified',
        params: { vendorId },
        result: qualified,
        contractCall: {
          circuit: 'isVendorQualified',
          input: `[${vendorId}]`,
          output: Array.isArray(result) ? `[${result[0]}]` : JSON.stringify(result),
          status: qualified ? 'QUALIFIED' : 'NOT_QUALIFIED',
          privacyNote: 'Only yes/no returned. Score and details are never revealed.',
          privacyLevel: 'PRIVACY_PRESERVING'
        },
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress,
        transactionHash: result?.transactionHash,
        gasUsed: result?.gasUsed?.toString()
      };
    } catch (error) {
      return {
        method: 'isVendorQualified',
        params: { vendorId },
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        contractAddress: this.contractAddress
      };
    }
  }

  /**
   * Get contract configuration
   */
  getContractConfig() {
    return {
      address: this.contractAddress,
      ...CONTRACT_CONFIG
    };
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const contractService = new VendorQualificationService(CONTRACT_CONFIG.ADDRESS);
