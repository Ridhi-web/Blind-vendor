/**
 * Contract Integration Examples
 * 
 * This file shows practical examples of how to integrate and call
 * the Vendor Qualification smart contract methods
 */

import { contractService, CONTRACT_CONFIG } from '../src/services/ContractService';

// ============================================================================
// EXAMPLE 1: VERIFY QUALIFICATION (Zero-Knowledge Proof)
// ============================================================================

/**
 * Example: Vendor proves their score >= minimum threshold
 * without revealing the actual score
 */
export async function exampleVerifyQualification() {
  console.log('=== Example 1: Verify Qualification (ZK Proof) ===\n');
  
  const result = await contractService.verifyQualification({
    vendorScore: 85,
    minimumThreshold: 80,
    salt: 12345n
  });

  console.log('Method:', result.method);
  console.log('Input:', result.contractCall?.input);
  console.log('Output:', result.contractCall?.output);
  console.log('Privacy:', result.contractCall?.privacyLevel);
  console.log('Result:', result.result);
  console.log('Contract Address:', result.contractAddress);
  console.log('\n');
}

// ============================================================================
// EXAMPLE 2: CHECK COMPLIANCE
// ============================================================================

/**
 * Example: Verify vendor meets all compliance criteria
 */
export async function exampleCheckCompliance() {
  console.log('=== Example 2: Check Compliance ===\n');
  
  const result = await contractService.checkCompliance({
    certificationValid: true,
    insuranceActive: true,
    paymentHistoryGood: true
  });

  console.log('Method:', result.method);
  console.log('Input:', result.contractCall?.input);
  console.log('Output:', result.contractCall?.output);
  console.log('Criteria:', result.contractCall?.criteria);
  console.log('Result:', result.result);
  console.log('Contract Address:', result.contractAddress);
  console.log('\n');
}

// ============================================================================
// EXAMPLE 3: RECORD QUALIFICATION
// ============================================================================

/**
 * Example: Record vendor as qualified in public ledger
 */
export async function exampleRecordQualification() {
  console.log('=== Example 3: Record Qualification ===\n');
  
  const result = await contractService.recordQualification(999);

  console.log('Method:', result.method);
  console.log('Input:', result.contractCall?.input);
  console.log('Ledger Update:', result.contractCall?.ledgerUpdate);
  console.log('Registry Size:', result.contractCall?.registrySize);
  console.log('Privacy:', result.contractCall?.privacyLevel);
  console.log('Note:', result.contractCall?.note);
  console.log('Contract Address:', result.contractAddress);
  console.log('\n');
}

// ============================================================================
// EXAMPLE 4: CHECK VENDOR STATUS
// ============================================================================

/**
 * Example: Check if vendor is qualified (yes/no only)
 */
export async function exampleCheckVendorStatus() {
  console.log('=== Example 4: Check Vendor Status ===\n');
  
  const result = await contractService.isVendorQualified(999);

  console.log('Method:', result.method);
  console.log('Input:', result.contractCall?.input);
  console.log('Output:', result.contractCall?.output);
  console.log('Status:', result.contractCall?.status);
  console.log('Privacy Note:', result.contractCall?.privacyNote);
  console.log('Result:', result.result);
  console.log('Contract Address:', result.contractAddress);
  console.log('\n');
}

// ============================================================================
// EXAMPLE 5: REACT COMPONENT USAGE
// ============================================================================

/**
 * React Component Example using the hook
 * 
 * import { useVendorQualificationContract } from '@/hooks/useContractMethods';
 * 
 * export function VendorQualificationComponent() {
 *   const { 
 *     verifyQualification, 
 *     loading, 
 *     result, 
 *     error,
 *     contractConfig 
 *   } = useVendorQualificationContract();
 *  
 *   const handleVerify = async () => {
 *     await verifyQualification({
 *       vendorScore: 85,
 *       minimumThreshold: 80,
 *       salt: 12345n
 *     });
 *   };
 *  
 *   return (
 *     <div>
 *       <p>Contract: {contractConfig.address}</p>
 *       <button onClick={handleVerify} disabled={loading}>
 *         {loading ? 'Verifying...' : 'Verify Qualification'}
 *       </button>
 *       {result && <p>Result: {result.result}</p>}
 *       {error && <p style={{color: 'red'}}>Error: {error}</p>}
 *     </div>
 *   );
 * }
 */

// ============================================================================
// EXAMPLE 6: COMPLETE WORKFLOW
// ============================================================================

/**
 * Complete workflow example showing all 4 circuits
 */
export async function exampleCompleteWorkflow() {
  console.log('=== Complete Workflow Example ===\n');
  
  try {
    // Step 1: Vendor proves qualification
    console.log('Step 1: Vendor proves qualification...');
    const qualifyResult = await contractService.verifyQualification({
      vendorScore: 85,
      minimumThreshold: 80,
      salt: 12345n
    });
    console.log(`Result: ${qualifyResult.result ? 'Qualified ✓' : 'Not Qualified ✗'}\n`);

    if (!qualifyResult.result) {
      console.log('Vendor does not qualify. Stopping workflow.\n');
      return;
    }

    // Step 2: Check compliance
    console.log('Step 2: Check compliance...');
    const complianceResult = await contractService.checkCompliance({
      certificationValid: true,
      insuranceActive: true,
      paymentHistoryGood: true
    });
    console.log(`Result: ${complianceResult.result ? 'Compliant ✓' : 'Not Compliant ✗'}\n`);

    if (!complianceResult.result) {
      console.log('Vendor does not meet compliance. Stopping workflow.\n');
      return;
    }

    // Step 3: Record qualification
    console.log('Step 3: Recording qualification in ledger...');
    const recordResult = await contractService.recordQualification(999);
    console.log(`Vendor 999 recorded in registry (size: ${recordResult.contractCall?.registrySize})\n`);

    // Step 4: Verify status
    console.log('Step 4: Verifying vendor status...');
    const statusResult = await contractService.isVendorQualified(999);
    console.log(`Vendor 999 status: ${statusResult.result ? 'Qualified ✓' : 'Not Qualified ✗'}\n`);

    // Show contract info
    console.log('=== Contract Information ===');
    console.log(`Address: ${CONTRACT_CONFIG.ADDRESS}`);
    console.log(`Network: ${CONTRACT_CONFIG.NETWORK}`);
    console.log(`Deployed At: ${CONTRACT_CONFIG.DEPLOYED_AT}`);
    
  } catch (error) {
    console.error('Error during workflow:', error);
  }
}

// ============================================================================
// EXAMPLE 7: ERROR HANDLING
// ============================================================================

/**
 * Example with error handling
 */
export async function exampleErrorHandling() {
  console.log('=== Error Handling Example ===\n');
  
  try {
    // Invalid parameters
    const result = await contractService.verifyQualification({
      vendorScore: 75,
      minimumThreshold: 80,
      salt: 12345n
    });

    if (result.error) {
      console.log('Error:', result.error);
    } else {
      console.log('Result:', result.result);
      if (!result.result) {
        console.log('Vendor does not meet threshold');
      }
    }
  } catch (error) {
    console.error('Exception caught:', error);
  }
}

// ============================================================================
// QUICK REFERENCE: CONTRACT ADDRESSES & METHODS
// ============================================================================

export const QUICK_REFERENCE = `
╔════════════════════════════════════════════════════════════════════════╗
║          VENDOR QUALIFICATION SMART CONTRACT - QUICK REFERENCE         ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  CONTRACT ADDRESS:                                                     ║
║  ${CONTRACT_CONFIG.ADDRESS}          ║
║                                                                        ║
║  NETWORK: ${CONTRACT_CONFIG.NETWORK}                                    ║
║  DEPLOYED: ${CONTRACT_CONFIG.DEPLOYED_AT}                      ║
║                                                                        ║
╠════════════════════════════════════════════════════════════════════════╣
║                         CIRCUITS (4 METHODS)                           ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  1. verifyQualification(vendorScore, minimumThreshold, salt)           ║
║     → Returns: Boolean                                                 ║
║     → Privacy: Full Zero-Knowledge                                     ║
║     → Use: Vendor proves score >= threshold without revealing score    ║
║                                                                        ║
║  2. checkCompliance(certification, insurance, paymentHistory)         ║
║     → Returns: Boolean                                                 ║
║     → Privacy: Full Zero-Knowledge                                     ║
║     → Use: Verify all compliance criteria pass                         ║
║                                                                        ║
║  3. recordQualification(vendorId)                                      ║
║     → Returns: None                                                    ║
║     → Privacy: Public                                                  ║
║     → Use: Record vendor in public ledger                              ║
║                                                                        ║
║  4. isVendorQualified(vendorId)                                        ║
║     → Returns: Boolean                                                 ║
║     → Privacy: Privacy-Preserving (yes/no only)                        ║
║     → Use: Check if vendor is qualified                                ║
║                                                                        ║
╠════════════════════════════════════════════════════════════════════════╣
║                            USAGE EXAMPLES                              ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  // Direct Service Usage                                              ║
║  const result = await contractService.verifyQualification({            ║
║    vendorScore: 85,                                                    ║
║    minimumThreshold: 80,                                               ║
║    salt: 12345n                                                        ║
║  });                                                                   ║
║                                                                        ║
║  // React Hook Usage                                                  ║
║  const { verifyQualification, loading, result } =                      ║
║    useVendorQualificationContract();                                   ║
║                                                                        ║
║  await verifyQualification({                                           ║
║    vendorScore: 85,                                                    ║
║    minimumThreshold: 80,                                               ║
║    salt: 12345n                                                        ║
║  });                                                                   ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
`;

// ============================================================================
// RUN ALL EXAMPLES
// ============================================================================

export async function runAllExamples() {
  console.clear();
  console.log(QUICK_REFERENCE);
  
  await exampleVerifyQualification();
  await exampleCheckCompliance();
  await exampleRecordQualification();
  await exampleCheckVendorStatus();
  await exampleCompleteWorkflow();
}

// Export for use in tests or main entry point
// Uncomment to run:
// runAllExamples().catch(console.error);
