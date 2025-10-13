# Blockchain Labs Collection

A comprehensive collection of blockchain development labs and projects covering Ethereum, Bitcoin, and modern web3 technologies.

## 🚀 Overview

This repository contains hands-on blockchain labs demonstrating various concepts including:
- **Ethereum Development** - Smart contracts, Web3 interactions, and Infura API integration
- **Bitcoin Cryptography** - Address generation and cryptographic operations
- **Modern Web3 Stack** - Next.js applications with blockchain integration
- **DevOps & Blockchain** - Full-stack blockchain applications with modern tooling

## 📁 Project Structure

```
blockchain_labs/
├── lab3/                          # Ethereum Infura API Integration
├── lab6/                          # Bitcoin Cryptography & Address Generation
├── lab7/                          # Additional Blockchain Experiments
├── exploring_devops_with_blockchaib/  # Full-stack Blockchain Application
├── merkle-proof/                  # Merkle Tree Implementation
├── new.js                        # Web3 Contract Interaction
├── web3.js                       # Ethereum Mainnet Connection
└── README.md                     # This file
```

## 🛠️ Labs Overview

### Lab 3: Ethereum Infura API Integration
**Location:** `lab3/`  
**Technology:** Ethers.js, Infura API, Sepolia Testnet

Complete blockchain interaction lab featuring:
- ✅ **Blockchain Querying** - Latest block details, account balances, gas prices
- ✅ **Gas Estimation** - Pre-execution gas estimation with accuracy analysis
- ✅ **Smart Contract Interaction** - Storage contract get/set operations
- ✅ **Tabular Results Display** - Professional data presentation
- ✅ **Error Handling** - Robust error management and validation

**Key Files:**
- `task1_query.js` - Blockchain querying functionality
- `task2_gas_estimation.js` - Gas estimation and comparison
- `task3_contract_interaction.js` - Smart contract interactions
- `complete_demo.js` - Comprehensive demonstration
- `Storage.sol` - Solidity storage contract

**Quick Start:**
```bash
cd lab3
npm install
npm run demo  # Run complete demonstration
```

### Lab 6: Bitcoin Cryptography & Address Generation
**Location:** `lab6/`  
**Technology:** Python, ECDSA, SHA-256, RIPEMD-160, Base58

Step-by-step Bitcoin address generation from scratch:
- 🔐 **Private Key Generation** - Secure 256-bit random key generation
- 📊 **Public Key Derivation** - ECDSA secp256k1 curve operations
- 🔄 **Hash Functions** - SHA-256 and RIPEMD-160 cryptographic hashing
- ✅ **Checksum Generation** - Double SHA-256 for address validation
- 📍 **Base58Check Encoding** - Final Bitcoin address format

**Key Files:**
- `btc_mainnet.py` - Complete Bitcoin address generation process
- `CompressedBitcoinAddressCompressed.py` - Compressed address variant

### Lab 7: Blockchain Experiments
**Location:** `lab7/`  
**Technology:** Python

Additional blockchain experiments and proof-of-concepts.

### Exploring DevOps with Blockchain
**Location:** `exploring_devops_with_blockchaib/`  
**Technology:** Next.js, TypeScript, Turbo, pnpm, Prisma

Modern full-stack blockchain application featuring:
- 🌐 **Next.js Web Application** - React-based frontend with modern tooling
- 🔧 **TypeScript Configuration** - Shared TypeScript configs across packages
- 📦 **Monorepo Architecture** - Turbo-powered workspace management
- 🎨 **UI Component Library** - Shared component system
- 💾 **Database Integration** - Prisma ORM setup
- ⚡ **Development Tools** - ESLint, Prettier, and build optimization

**Architecture:**
```
bms/
├── apps/
│   ├── web/          # Next.js frontend application
│   ├── http-server/  # HTTP server backend
│   └── ws-server/    # WebSocket server
├── packages/
│   ├── ui/           # Shared UI components
│   ├── prisma/       # Database schema and client
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configs
```

**Quick Start:**
```bash
cd exploring_devops_with_blockchaib/bms
pnpm install
pnpm dev  # Start development server
```

### Merkle Proof Implementation
**Location:** `merkle-proof/`  
**Technology:** Hardhat, Solidity

Merkle tree implementation for blockchain applications:
- 🌳 **Merkle Tree Construction** - Efficient data structure for blockchain
- ✅ **Proof Generation** - Cryptographic proof generation and verification
- 🔒 **Security Features** - Tamper-proof data integrity

**Quick Start:**
```bash
cd merkle-proof
npm install
npx hardhat compile  # Compile contracts
```

## 🔧 Individual Scripts

### Web3 Contract Interaction
**File:** `new.js`  
**Purpose:** Direct Web3.js contract interaction with Infura Sepolia testnet

Features:
- Contract ABI integration
- Direct method calls (retrieve/store)
- Error handling and logging

### Ethereum Mainnet Connection
**File:** `web3.js`  
**Purpose:** Simple Ethereum mainnet connection and block querying

Features:
- Mainnet connectivity via Infura
- Latest block number retrieval
- Network status monitoring

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.8 or higher) for Bitcoin labs
- **pnpm** (for monorepo projects)
- **Git**

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd blockchain_labs
```

2. **Install dependencies for individual labs:**
```bash
# For Lab 3 (Ethereum)
cd lab3
npm install

# For DevOps project
cd exploring_devops_with_blockchaib/bms
pnpm install

# For Merkle Proof
cd merkle-proof
npm install
```

3. **Set up environment variables:**
```bash
# Copy and configure environment files
cp .env.example .env
# Add your Infura API keys and private keys
```

## 🔑 API Configuration

### Infura API Keys
- **Lab 3:** `926f7766fb3b40eabde8f7f8fa66b10a` (Sepolia)
- **General:** `86edeec464904ef0a823de6a7e32d37b` (Mainnet/Sepolia)

### Network Endpoints
- **Sepolia Testnet:** `https://sepolia.infura.io/v3/{API_KEY}`
- **Ethereum Mainnet:** `https://mainnet.infura.io/v3/{API_KEY}`

## 📚 Learning Objectives

By completing these labs, you will understand:

### Blockchain Fundamentals
- Public/private key cryptography
- Hash functions and digital signatures
- Blockchain data structures (blocks, transactions, merkle trees)
- Consensus mechanisms and network protocols

### Ethereum Development
- Smart contract development and deployment
- Web3.js and Ethers.js library usage
- Gas estimation and optimization
- Testnet interaction and mainnet deployment

### Bitcoin Technology
- Address generation and validation
- Transaction structure and scripting
- Cryptographic primitives (ECDSA, SHA-256, RIPEMD-160)
- Base58Check encoding

### Modern Web3 Development
- Full-stack blockchain applications
- Monorepo architecture and tooling
- TypeScript integration
- Development workflow optimization

## 🛡️ Security Considerations

⚠️ **Important Security Notes:**
- Private keys in code are for demonstration only
- Use environment variables for production deployments
- Never commit real private keys to version control
- Use testnet ETH for development and testing
- Implement proper key management in production

## 🧪 Testing

Each lab includes comprehensive testing and validation:
- **Lab 3:** Complete demo script with tabular results
- **Lab 6:** Step-by-step Bitcoin address generation verification
- **DevOps Project:** Automated testing with TypeScript validation

## 📖 Additional Resources

- [Ethers.js Documentation](https://docs.ethers.io/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [Bitcoin Developer Documentation](https://developer.bitcoin.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Hardhat Documentation](https://hardhat.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Add more Ethereum smart contract examples
- [ ] Implement Bitcoin transaction creation
- [ ] Add IPFS integration examples
- [ ] Create DeFi protocol interactions
- [ ] Add cross-chain bridge examples

---

**Happy Blockchain Development! 🚀**

For questions or support, please open an issue in the repository.