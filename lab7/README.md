# Lab 7: Merkle Tree Proofs

This lab implements and demonstrates Merkle tree concepts, proof generation, and verification as required for blockchain applications.

## Overview

A Merkle tree is a binary tree where:
- **Leaves**: Individual transaction hashes
- **Internal nodes**: Hashes of their children
- **Root**: Single hash representing the entire tree
- **Proof**: Path from leaf to root with siblings

## Files Structure

```
lab7/
├── MerkleProof.sol          # Solidity contract implementation
├── merkle_proof_generator.py # Python proof generator and tester
├── test_merkle_proofs.py     # Comprehensive test suite
├── deploy_and_test.js        # JavaScript deployment and testing
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## Task Implementation

### Task 1: Understanding Merkle Tree Concepts

The Merkle tree is built with 4 transactions:
1. `"alice -> bob"` (index 0)
2. `"bob -> dave"` (index 1) 
3. `"carol -> alice"` (index 2)
4. `"dave -> bob"` (index 3)

**Tree Structure:**
```
Level 0 (Leaves): [H0, H1, H2, H3]
Level 1: [H(H0+H1), H(H2+H3)]
Level 2 (Root): [H(H(H0+H1) + H(H2+H3))]
```

### Task 2: Proof for "dave -> bob" (5th Transaction)

The proof for `"dave -> bob"` (index 3) includes:
- **Leaf**: Hash of "dave -> bob"
- **Proof Path**: Siblings needed to reconstruct the root
- **Index**: 3 (used to determine left/right positioning)

### Task 3: Generate and Test All Proofs

Each leaf requires a unique proof path:
- **Index 0**: Needs siblings from right
- **Index 1**: Needs siblings from left and right  
- **Index 2**: Needs siblings from left and right
- **Index 3**: Needs siblings from left

## Running the Lab

### Python Implementation

```bash
# Run comprehensive test suite
python3 test_merkle_proofs.py

# Run proof generator
python3 merkle_proof_generator.py
```

### JavaScript Implementation

```bash
# Install dependencies
npm install

# Run tests
npm test
```

### Solidity Contract

Deploy the `MerkleProof.sol` contract to test verification on-chain.

## Key Concepts Demonstrated

1. **Merkle Tree Construction**: Bottom-up building from leaf hashes
2. **Proof Generation**: Path from leaf to root with sibling hashes
3. **Proof Verification**: Reconstructing root from leaf and proof path
4. **Index-based Positioning**: Determining left/right child relationships
5. **Cryptographic Hashing**: Using keccak256 for consistent hashing

## Verification Process

For each proof:
1. Start with the leaf hash
2. For each proof element:
   - If index is even: hash = keccak256(leaf + proof_element)
   - If index is odd: hash = keccak256(proof_element + leaf)
   - Update index = index / 2
3. Check if final hash equals root

## Example Output

```
Transaction: dave -> bob
Leaf Hash: 0x...
Proof Path: [0x..., 0x...]
Verification: ✓ VALID
```

## Security Considerations

- Merkle proofs allow efficient verification without downloading entire tree
- Tampering with any leaf invalidates the entire proof
- Tree structure enables O(log n) proof size and verification time
- Used in blockchain for transaction verification and state proofs

## Learning Outcomes

After completing this lab, you should understand:
- How Merkle trees organize and verify data
- The relationship between tree structure and proof paths
- Efficient cryptographic verification methods
- Implementation in both Python and Solidity
- Practical applications in blockchain systems
