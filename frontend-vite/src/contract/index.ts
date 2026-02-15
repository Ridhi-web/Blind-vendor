/**
 * Main Export File for All Contract Integration
 * 
 * Provides centralized access to all contract methods, hooks, and services
 * from a single import point
 */

// ============================================================================
// SERVICE EXPORTS
// ============================================================================

export {
  contractService,
  VendorQualificationService,
  CONTRACT_CONFIG,
} from './services';

export type {
  VerifyQualificationParams,
  CheckComplianceParams,
  SmartContractResponse,
} from './services';

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

export {
  useVerifyQualification,
  useCheckCompliance,
  useRecordQualification,
  useCheckVendorStatus,
  useVendorQualificationContract,
} from './hooks';

// ============================================================================
// COMPREHENSIVE USAGE GUIDE
// ============================================================================

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                   CONTRACT INTEGRATION - QUICK START
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * CONTRACT ADDRESS: 2aa78f99159e7662a1fe3658f402ef4e64ff77c8769cb07368ac1702696301f8
 * Network: midnight-testnet
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 *                             IMPORT OPTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * // Option 1: Import from root contract module (RECOMMENDED)
 * import { 
 *   contractService,
 *   useVendorQualificationContract,
 *   type SmartContractResponse
 * } from '@/contract';
 * 
 * // Option 2: Import from specific folders
 * import { contractService } from '@/services';
 * import { useVendorQualificationContract } from '@/hooks';
 * 
 * // Option 3: Import directly from files
 * import { contractService } from '@/services/ContractService';
 * import { useVendorQualificationContract } from '@/hooks/useContractMethods';
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 *                           USAGE PATTERNS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * PATTERN 1: Direct Service (Non-React Context)
 * ────────────────────────────────────────────────────────────────────────────
 * import { contractService } from '@/contract';
 * 
 * const result = await contractService.verifyQualification({
 *   vendorScore: 85,
 *   minimumThreshold: 80,
 *   salt: 12345
 * });
 * 
 * console.log(result.result);          // true or false
 * console.log(result.contractAddress); // Contract address used
 * 
 * 
 * PATTERN 2: React Hook (Component Context)
 * ────────────────────────────────────────────────────────────────────────────
 * import { useVendorQualificationContract } from '@/contract';
 * 
 * export function MyComponent() {
 *   const { verifyQualification, loading, result, error } = 
 *     useVendorQualificationContract();
 * 
 *   const handleClick = async () => {
 *     await verifyQualification({
 *       vendorScore: 85,
 *       minimumThreshold: 80,
 *       salt: 12345
 *     });
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={handleClick} disabled={loading}>
 *         {loading ? 'Verifying...' : 'Verify'}
 *       </button>
 *       {error && <p style={{color: 'red'}}>{error}</p>}
 *       {result && <p>Result: {result.result ? 'YES' : 'NO'}</p>}
 *     </div>
 *   );
 * }
 * 
 * 
 * PATTERN 3: Individual Hook
 * ────────────────────────────────────────────────────────────────────────────
 * import { useVerifyQualification } from '@/contract';
 * 
 * const { verify, loading, result, error } = useVerifyQualification();
 * 
 * 
 * PATTERN 4: Type-Safe Parameters
 * ────────────────────────────────────────────────────────────────────────────
 * import { 
 *   contractService,
 *   type VerifyQualificationParams,
 *   type SmartContractResponse 
 * } from '@/contract';
 * 
 * const handleVerify = async (params: VerifyQualificationParams) => {
 *   const response: SmartContractResponse = 
 *     await contractService.verifyQualification(params);
 *   return response;
 * };
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 *                           ALL 4 CIRCUITS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Circuit 1: Verify Qualification (ZK Proof)
 * ──────────────────────────────────────────
 * const result = await contractService.verifyQualification({
 *   vendorScore: 85,
 *   minimumThreshold: 80,
 *   salt: 12345
 * });
 * // Returns: Boolean - true if score >= threshold
 * // Privacy: Full Zero-Knowledge
 * 
 * 
 * Circuit 2: Check Compliance
 * ────────────────────────────
 * const result = await contractService.checkCompliance({
 *   certificationValid: true,
 *   insuranceActive: true,
 *   paymentHistoryGood: true
 * });
 * // Returns: Boolean - true if all criteria met
 * // Privacy: Full Zero-Knowledge
 * 
 * 
 * Circuit 3: Record Qualification
 * ────────────────────────────────
 * const result = await contractService.recordQualification(999);
 * // Returns: None
 * // Privacy: Public - visible on-chain
 * // Action: Records vendor in public ledger
 * 
 * 
 * Circuit 4: Check Vendor Status
 * ───────────────────────────────
 * const result = await contractService.isVendorQualified(999);
 * // Returns: Boolean - true if qualified
 * // Privacy: Privacy-Preserving (yes/no only)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 *                         HOOKS WITH TYPES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * import {
 *   useVendorQualificationContract,
 *   type SmartContractResponse
 * } from '@/contract';
 * 
 * export function VendorForm() {
 *   const {
 *     verifyQualification,
 *     checkCompliance,
 *     recordQualification,
 *     checkVendorStatus,
 *     loading,
 *     result,
 *     error,
 *     contractConfig
 *   } = useVendorQualificationContract();
 * 
 *   const response: SmartContractResponse | null = result;
 * 
 *   return (
 *     <div>
 *       <p>Contract: {contractConfig.address}</p>
 *       <p>Network: {contractConfig.network}</p>
 *     </div>
 *   );
 * }
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 *                        RESPONSE STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * interface SmartContractResponse {
 *   method: string;              // Method name
 *   params?: any;                // Parameters sent
 *   result?: any;                // Return value
 *   contractCall?: {
 *     circuit: string;           // Circuit name
 *     input: string;             // Formatted input
 *     output: string;            // Formatted output
 *     [key: string]: any;        // Additional data
 *   };
 *   error?: string;              // Error message if any
 *   timestamp: string;           // ISO timestamp
 *   contractAddress: string;     // Contract used
 * }
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
