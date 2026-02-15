# Smart Contract Integration Guide

## 📋 Contract Information

### Deployed Contract Address
```
2aa78f99159e7662a1fe3658f402ef4e64ff77c8769cb07368ac1702696301f8
```

**Source**: `contract/deployment.json`

### Network Details
- **Network**: midnight-testnet
- **Deployed At**: 2026-02-14T10:02:32.337Z
- **Seed**: 1d9e3b1b189456b336ce58febc602f8be2aec4db9bbb711b7c4aeaca2d97b91b

---

## 🔗 Integration Files Created

### 1. **ContractService.ts** 
**Location**: `frontend-vite/src/services/ContractService.ts`

Updated with real contract address and all 4 circuits fully documented.

```typescript
import { contractService } from '@/services/ContractService';

// The service now includes the real contract address
const config = contractService.getContractConfig();
console.log(config.address); // 2aa78f99159e7662a1fe3658f402ef4e64ff77c8769cb07368ac1702696301f8
```

### 2. **useContractMethods.ts** (React Hooks)
**Location**: `frontend-vite/src/hooks/useContractMethods.ts`

Provides React hooks for calling contract methods with automatic loading/error state management.

```typescript
import { useVendorQualificationContract } from '@/hooks/useContractMethods';

export function MyComponent() {
  const { 
    verifyQualification, 
    checkCompliance,
    recordQualification,
    checkVendorStatus,
    loading, 
    result, 
    error,
    contractConfig 
  } = useVendorQualificationContract();

  return (
    <div>
      <p>Contract: {contractConfig.address}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && <p>Result: {result.result}</p>}
    </div>
  );
}
```

### 3. **ContractExamples.ts**
**Location**: `frontend-vite/src/examples/ContractExamples.ts`

Complete examples of calling all 4 circuits with documentation.

---

## 🚀 How to Call Contract Methods

### Method 1: Direct Service Usage (Simple)

```typescript
import { contractService } from '@/services/ContractService';

// Circuit 1: Verify Qualification (ZK Proof)
const result = await contractService.verifyQualification({
  vendorScore: 85,
  minimumThreshold: 80,
  salt: 12345
});
console.log(result.result); // true or false
console.log(result.contractAddress); // Contract address used


// Circuit 2: Check Compliance
const result = await contractService.checkCompliance({
  certificationValid: true,
  insuranceActive: true,
  paymentHistoryGood: true
});
console.log(result.result); // true or false


// Circuit 3: Record Qualification
const result = await contractService.recordQualification(999);
console.log(result.contractCall?.registrySize); // Updated registry size


// Circuit 4: Check Vendor Status
const result = await contractService.isVendorQualified(999);
console.log(result.result); // true or false
console.log(result.contractCall?.status); // "QUALIFIED" or "NOT_QUALIFIED"
```

### Method 2: React Hooks (Recommended for Components)

```typescript
import { useVendorQualificationContract } from '@/hooks/useContractMethods';

export function VendorForm() {
  const { verifyQualification, loading, result, error } = useVendorQualificationContract();

  const handleVerify = async () => {
    await verifyQualification({
      vendorScore: 85,
      minimumThreshold: 80,
      salt: 12345
    });
  };

  return (
    <div>
      <button onClick={handleVerify} disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {result && <p>Result: {result.result ? 'Qualified ✓' : 'Not Qualified ✗'}</p>}
    </div>
  );
}
```

### Method 3: Individual Hooks (Specific Methods)

```typescript
import { 
  useVerifyQualification,
  useCheckCompliance,
  useRecordQualification,
  useCheckVendorStatus
} from '@/hooks/useContractMethods';

// Use specific hook for one method
const { verify, loading, result, error } = useVerifyQualification();

await verify({
  vendorScore: 85,
  minimumThreshold: 80,
  salt: 12345
});
```

---

## 📝 All 4 Circuits Explained

### ✅ Circuit 1: verifyQualification

**Purpose**: ZK proof that vendor score ≥ minimum threshold

**Parameters**:
- `vendorScore` (U32): Vendor's qualification score
- `minimumThreshold` (U32): Minimum required score
- `salt` (U256): Random salt for proof

**Returns**: `Boolean` - true if qualified

**Privacy**: 🔒 **FULL ZERO-KNOWLEDGE** - Score never revealed

**Example**:
```typescript
const result = await contractService.verifyQualification({
  vendorScore: 85,
  minimumThreshold: 80,
  salt: 12345
});
// Result: true (85 >= 80)
```

---

### ✅ Circuit 2: checkCompliance

**Purpose**: Verify all compliance criteria pass

**Parameters**:
- `certificationValid` (Bool): Is certification valid?
- `insuranceActive` (Bool): Is insurance active?
- `paymentHistoryGood` (Bool): Is payment history good?

**Returns**: `Boolean` - true if all criteria met

**Privacy**: 🔒 **FULL ZERO-KNOWLEDGE**

**Example**:
```typescript
const result = await contractService.checkCompliance({
  certificationValid: true,
  insuranceActive: true,
  paymentHistoryGood: true
});
// Result: true (all true)

// Result: false if any is false
const result = await contractService.checkCompliance({
  certificationValid: true,
  insuranceActive: false, // ❌
  paymentHistoryGood: true
});
// Result: false
```

---

### ✅ Circuit 3: recordQualification

**Purpose**: Record vendor as qualified in public ledger

**Parameters**:
- `vendorId` (U256): The vendor ID to record

**Returns**: None

**Privacy**: 📝 **PUBLIC** - Visible on-chain

**Action**: Updates `vendors` ledger, marks vendor as qualified

**Example**:
```typescript
const result = await contractService.recordQualification(999);
// Vendor 999 is now in the qualified registry
```

---

### ✅ Circuit 4: isVendorQualified

**Purpose**: Check if vendor is qualified

**Parameters**:
- `vendorId` (U256): The vendor ID to check

**Returns**: `Boolean` - true if qualified

**Privacy**: 🔒 **PRIVACY-PRESERVING** - Only yes/no returned

**Example**:
```typescript
const result = await contractService.isVendorQualified(999);
// Result: true (if previously recorded)

const result = await contractService.isVendorQualified(123);
// Result: false (not in registry)
```

---

## 🎨 Using in React Components

### Full Component Example

```typescript
import { useState } from 'react';
import { useVendorQualificationContract } from '@/hooks/useContractMethods';

export function VendorQualificationApp() {
  const [vendorScore, setVendorScore] = useState('');
  const [threshold, setThreshold] = useState('');
  
  const { 
    verifyQualification, 
    recordQualification,
    checkVendorStatus,
    loading, 
    result,
    error,
    contractConfig 
  } = useVendorQualificationContract();

  const handleVerify = async () => {
    await verifyQualification({
      vendorScore: parseInt(vendorScore),
      minimumThreshold: parseInt(threshold),
      salt: Date.now()
    });
  };

  const handleRecord = async () => {
    await recordQualification(999);
  };

  const handleCheckStatus = async () => {
    await checkVendorStatus(999);
  };

  return (
    <div>
      <h1>Vendor Qualification</h1>
      <p>Contract: {contractConfig.address}</p>
      
      <div>
        <input 
          value={vendorScore} 
          onChange={(e) => setVendorScore(e.target.value)}
          placeholder="Vendor Score"
        />
        <input 
          value={threshold} 
          onChange={(e) => setThreshold(e.target.value)}
          placeholder="Min Threshold"
        />
        <button onClick={handleVerify} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>

      <button onClick={handleRecord} disabled={loading}>Record</button>
      <button onClick={handleCheckStatus} disabled={loading}>Check Status</button>

      {error && <p style={{color: 'red'}}>{error}</p>}
      {result && (
        <div>
          <p>Method: {result.method}</p>
          <p>Result: {String(result.result)}</p>
          <p>Address: {result.contractAddress}</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🔧 Connecting to Real Contract

When ready to connect to the actual deployed contract on Midnight:

1. **Update the SDK Client**:
```typescript
// In frontend-vite/src/services/ContractService.ts
import { MidnightSdk } from '@midnight-ntwrk/sdk';

const sdk = new MidnightSdk({
  contractAddress: CONTRACT_CONFIG.ADDRESS,
  network: CONTRACT_CONFIG.NETWORK
});
```

2. **Replace Simulated Calls**:
```typescript
async verifyQualification(params: VerifyQualificationParams) {
  // Replace this:
  // const qualifies = vendorScore >= minimumThreshold;
  
  // With this:
  const result = await sdk.contracts[CONTRACT_CONFIG.ADDRESS]
    .verifyQualification(params);
  
  return { ...response, result };
}
```

3. **Add Error Handling**:
```typescript
try {
  const result = await sdk.call(...);
  return { ...response, result };
} catch (error) {
  return { ...response, error: error.message };
}
```

---

## 📊 Response Structure

All contract calls return this structure:

```typescript
interface SmartContractResponse {
  method: string;              // Method name
  params?: any;                // Parameters passed
  result?: any;                // Return value from circuit
  contractCall?: {
    circuit: string;           // Circuit name
    input: string;             // Formatted input
    output: string;            // Formatted output
    [key: string]: any;        // Additional metadata
  };
  error?: string;              // Error message if any
  timestamp: string;           // ISO timestamp
  contractAddress: string;     // Contract address used
}
```

---

## 🧪 Testing

### Test Verify Qualification
```typescript
// Should return true
await contractService.verifyQualification({
  vendorScore: 85,
  minimumThreshold: 80,
  salt: 12345
});

// Should return false
await contractService.verifyQualification({
  vendorScore: 75,
  minimumThreshold: 80,
  salt: 12345
});
```

### Test Check Compliance
```typescript
// Should return true
await contractService.checkCompliance({
  certificationValid: true,
  insuranceActive: true,
  paymentHistoryGood: true
});

// Should return false
await contractService.checkCompliance({
  certificationValid: false,
  insuranceActive: true,
  paymentHistoryGood: true
});
```

### Test Record & Query
```typescript
// Record vendor
await contractService.recordQualification(999);

// Check status (should be true)
await contractService.isVendorQualified(999);

// Check non-existent (should be false)
await contractService.isVendorQualified(123);
```

---

## 📚 File Structure

```
frontend-vite/
├── src/
│   ├── services/
│   │   └── ContractService.ts          # ⭐ Main service
│   ├── hooks/
│   │   └── useContractMethods.ts       # ⭐ React hooks
│   ├── components/
│   │   ├── VerifyQualification.tsx     # Already using service
│   │   ├── CheckCompliance.tsx         # Already using service
│   │   ├── VendorRegistry.tsx          # Already using service
│   │   └── ...
│   └── examples/
│       └── ContractExamples.ts         # ⭐ Usage examples
```

---

## 🚀 Quick Start

1. **Import the service**:
```typescript
import { contractService } from '@/services/ContractService';
```

2. **Call a method**:
```typescript
const result = await contractService.verifyQualification({
  vendorScore: 85,
  minimumThreshold: 80,
  salt: 12345
});
```

3. **Use the result**:
```typescript
if (result.result) {
  console.log('Vendor qualified!');
} else if (result.error) {
  console.error('Error:', result.error);
} else {
  console.log('Vendor not qualified');
}
```

---

## 📞 Support

- **Contract Address**: `2aa78f99159e7662a1fe3658f402ef4e64ff77c8769cb07368ac1702696301f8`
- **Contract File**: `contract/src/blinding.compact`
- **Deployment Config**: `contract/deployment.json`
- **Service**: `frontend-vite/src/services/ContractService.ts`
- **Hooks**: `frontend-vite/src/hooks/useContractMethods.ts`
- **Examples**: `frontend-vite/src/examples/ContractExamples.ts`
