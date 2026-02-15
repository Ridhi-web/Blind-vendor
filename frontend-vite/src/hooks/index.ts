/**
 * Centralized Export File for Contract Methods
 * 
 * This file re-exports all contract-related methods, hooks, and types
 * for easy access throughout the application
 */

// ============================================================================
// SERVICE EXPORTS
// ============================================================================

export {
  contractService,
  VendorQualificationService,
  CONTRACT_CONFIG,
  type VerifyQualificationParams,
  type CheckComplianceParams,
  type SmartContractResponse,
} from '../services/ContractService';

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

export {
  // Individual hooks for specific circuits
  useVerifyQualification,
  useCheckCompliance,
  useRecordQualification,
  useCheckVendorStatus,
  // Unified hook for all methods
  useVendorQualificationContract,
} from './useContractMethods';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  // Re-export types for convenient access
} from '../services/ContractService';

// ============================================================================
// USAGE EXAMPLES IN COMMENTS
// ============================================================================

/**
 * ===== BASIC USAGE EXAMPLES =====
 * 
 * 1. Using Individual Hooks:
 * 
 *    import { useVerifyQualification } from '@/hooks/index'
 * 
 *    const { verify, loading, result, error } = useVerifyQualification();
 *    await verify({ vendorScore: 85, minimumThreshold: 80, salt: 12345 });
 * 
 * 
 * 2. Using Unified Hook:
 * 
 *    import { useVendorQualificationContract } from '@/hooks/index'
 * 
 *    const { verifyQualification, checkCompliance, loading, result } = 
 *      useVendorQualificationContract();
 * 
 * 
 * 3. Using Service Directly:
 * 
 *    import { contractService } from '@/hooks/index'
 * 
 *    const result = await contractService.verifyQualification({
 *      vendorScore: 85,
 *      minimumThreshold: 80,
 *      salt: 12345
 *    });
 * 
 * 
 * 4. Using Types:
 * 
 *    import { 
 *      type VerifyQualificationParams,
 *      type SmartContractResponse 
 *    } from '@/hooks/index'
 * 
 *    const doVerification = async (
 *      params: VerifyQualificationParams
 *    ): Promise<SmartContractResponse> => {
 *      return await contractService.verifyQualification(params);
 *    }
 */
