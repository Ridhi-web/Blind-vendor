/**
 * React Hooks for Smart Contract Integration
 * 
 * Provides easy-to-use hooks for calling contract methods from React components
 */

import { useState, useCallback } from 'react';
import { 
  contractService, 
  SmartContractResponse,
  VerifyQualificationParams,
  CheckComplianceParams,
  CONTRACT_CONFIG
} from '../services/ContractService';

// ============================================================================
// VERIFY QUALIFICATION HOOK
// ============================================================================

export function useVerifyQualification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartContractResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (params: VerifyQualificationParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.verifyQualification(params);
      setResult(response);
      if (response.error) {
        setError(response.error);
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verify, loading, result, error };
}

// ============================================================================
// CHECK COMPLIANCE HOOK
// ============================================================================

export function useCheckCompliance() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartContractResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (params: CheckComplianceParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.checkCompliance(params);
      setResult(response);
      if (response.error) {
        setError(response.error);
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { check, loading, result, error };
}

// ============================================================================
// RECORD QUALIFICATION HOOK
// ============================================================================

export function useRecordQualification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartContractResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const record = useCallback(async (vendorId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.recordQualification(vendorId);
      setResult(response);
      if (response.error) {
        setError(response.error);
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { record, loading, result, error };
}

// ============================================================================
// CHECK VENDOR STATUS HOOK
// ============================================================================

export function useCheckVendorStatus() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartContractResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (vendorId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.isVendorQualified(vendorId);
      setResult(response);
      if (response.error) {
        setError(response.error);
      }
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { check, loading, result, error };
}

// ============================================================================
// UNIFIED CONTRACT HOOK (All Methods)
// ============================================================================

export function useVendorQualificationContract() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartContractResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyQualification = useCallback(async (params: VerifyQualificationParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.verifyQualification(params);
      setResult(response);
      if (response.error) setError(response.error);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkCompliance = useCallback(async (params: CheckComplianceParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.checkCompliance(params);
      setResult(response);
      if (response.error) setError(response.error);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const recordQualification = useCallback(async (vendorId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.recordQualification(vendorId);
      setResult(response);
      if (response.error) setError(response.error);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkVendorStatus = useCallback(async (vendorId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await contractService.isVendorQualified(vendorId);
      setResult(response);
      if (response.error) setError(response.error);
      return response;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    verifyQualification,
    checkCompliance,
    recordQualification,
    checkVendorStatus,
    loading,
    result,
    error,
    contractConfig: {
      address: CONTRACT_CONFIG.ADDRESS,
      network: CONTRACT_CONFIG.NETWORK,
      deployedAt: CONTRACT_CONFIG.DEPLOYED_AT
    }
  };
}
