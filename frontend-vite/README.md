# Vendor Qualification Frontend - Vite Version

A modern, production-ready React + TypeScript frontend for the Vendor Qualification smart contract using Vite.

## Features

- ⚡ **Vite**: Ultra-fast build tool and dev server
- 🎨 **React 18**: Modern UI library with hooks
- 📘 **TypeScript**: Full type safety
- 🔗 **Smart Contract Integration**: Calls all 4 contract circuits
- 💎 **Component-Based**: Modular architecture
- 📱 **Responsive Design**: Mobile-first approach
- 🛠️ **Debug Console**: View all smart contract calls
- 🎯 **Zero Dependencies**: Uses only React and React DOM

## Smart Contract Circuits Implemented

### 1. **Verify Qualification** ✓
- Input: Vendor Score (U32), Minimum Threshold (U32), Salt (U256)
- Output: Boolean (true if qualified)
- ZK Proof: Proves `score >= threshold` without revealing actual score

### 2. **Check Compliance** 📋
- Input: 3 boolean flags (Certification, Insurance, Payment History)
- Output: Boolean (true if all criteria met)
- Logic: `certification && insurance && paymentHistory`

### 3. **Record Qualification** 📝
- Input: Vendor ID (U256)
- Output: None
- Action: Records vendor as qualified in public ledger

### 4. **Check Vendor Status** ❓
- Input: Vendor ID (U256)
- Output: Boolean (true if qualified)
- Privacy: Yes/No only, no details revealed

## Project Structure

```
frontend-vite/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # App header with branding
│   │   ├── Card.tsx             # Reusable card component
│   │   ├── VerifyQualification.tsx    # Circuit 1 UI
│   │   ├── CheckCompliance.tsx        # Circuit 2 UI
│   │   ├── VendorRegistry.tsx         # Circuits 3 & 4 UI
│   │   ├── ResultBox.tsx             # Result display component
│   │   ├── Debug.tsx                 # Debug console
│   │   └── *.css                     # Component styles
│   ├── App.tsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite type definitions
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── README.md                    # This file
└── .gitignore                   # Git ignore rules
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm

### Setup

```bash
# Navigate to frontend-vite directory
cd frontend-vite

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Verify Qualification**
   - Enter vendor score (e.g., 85)
   - Enter minimum threshold (e.g., 80)
   - Enter salt value (for ZK proof)
   - Click "Verify Qualification"

2. **Check Compliance**
   - Toggle compliance checkboxes
   - Click "Check Compliance"
   - View result

3. **Record Qualification**
   - Enter vendor ID
   - Click "Record Qualification"
   - Vendor is now marked in registry

4. **Check Vendor Status**
   - Enter vendor ID
   - Click "Check Status"
   - View qualification status

## Smart Contract Integration

The frontend simulates smart contract calls. To integrate with real contract:

### Option 1: Direct Midnight SDK Integration

```typescript
import { MidnightSdk } from '@midnight-ntwrk/sdk';

// Initialize SDK
const sdk = new MidnightSdk();

// Call contract methods
const result = await contract.verifyQualification(
  vendorScore,
  minimumThreshold,
  salt
);
```

### Option 2: API Gateway

```typescript
// Call backend API that interfaces with contract
const response = await fetch('/api/verify-qualification', {
  method: 'POST',
  body: JSON.stringify({ vendorScore, minimumThreshold, salt })
});
```

## Component Architecture

### Header
- Displays app title and status
- Shows "Smart Contract Connected" badge
- Responsive on all screen sizes

### Card
- Reusable container for each circuit
- Badge, title, description
- Consistent styling across all cards

### VerifyQualification / CheckCompliance
- Input form with validation
- Loading states
- Result display
- Debug info tracking

### ResultBox
- Displays contract call results
- Shows input/output details
- Color-coded success/error states
- Formatted for readability

### Debug Console
- Collapsible panel showing all calls
- JSON formatted output
- Copy to clipboard button
- Timestamps for each call

## Styling

- **Color Scheme**: Purple gradient (#667eea to #764ba2)
- **Typography**: Segoe UI system font
- **Spacing**: Consistent padding/margins
- **Animations**: Smooth transitions and keyframes
- **Responsive**: Mobile-first design approach

## Development

### Hot Module Replacement (HMR)
Vite provides instant updates during development.

### ESLint
Code quality checking with TypeScript support.

### Building
```bash
npm run build
# Output: dist/ directory ready for deployment
```

## Deployment

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages
See [Vite GitHub Pages deployment guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Performance

- Build size: ~50KB (gzipped)
- No external API dependencies
- Instant HMR during development
- Production-optimized builds

## License

Apache-2.0

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Midnight Protocol](https://midnightprotocol.io)

## Support

For issues or questions, please refer to the main project repository.
