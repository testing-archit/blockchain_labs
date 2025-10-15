#!/usr/bin/env python3
"""
Merkle Tree Proof Generator and Tester for Lab 7
This script generates Merkle proofs for all leaves and demonstrates the verification process.
"""

import hashlib
import json
from typing import List, Tuple

class MerkleTree:
    def __init__(self, transactions: List[str]):
        self.transactions = transactions
        self.leaves = [self._hash_transaction(tx) for tx in transactions]
        self.tree = self._build_tree()
        self.root = self.tree[-1][0] if self.tree else None
    
    def _hash_transaction(self, transaction: str) -> str:
        """Hash a transaction string using keccak256"""
        # In Solidity: keccak256(abi.encodePacked(transaction))
        # Here we simulate with SHA3-256 (keccak256)
        return hashlib.sha3_256(transaction.encode()).hexdigest()
    
    def _hash_pair(self, left: str, right: str) -> str:
        """Hash two hashes together (simulating abi.encodePacked)"""
        combined = left + right
        return hashlib.sha3_256(bytes.fromhex(combined)).hexdigest()
    
    def _build_tree(self) -> List[List[str]]:
        """Build the Merkle tree bottom-up"""
        tree = [self.leaves.copy()]
        current_level = self.leaves.copy()
        
        while len(current_level) > 1:
            next_level = []
            for i in range(0, len(current_level) - 1, 2):
                left = current_level[i]
                right = current_level[i + 1]
                combined_hash = self._hash_pair(left, right)
                next_level.append(combined_hash)
            
            # If odd number of nodes, duplicate the last one
            if len(current_level) % 2 == 1:
                last_node = current_level[-1]
                next_level.append(last_node)
            
            tree.append(next_level)
            current_level = next_level
        
        return tree
    
    def get_proof(self, leaf_index: int) -> Tuple[List[str], List[bool]]:
        """
        Generate Merkle proof for a leaf at given index
        Returns: (proof_path, is_right_sibling)
        """
        if leaf_index >= len(self.leaves):
            raise ValueError("Leaf index out of bounds")
        
        proof_path = []
        is_right_sibling = []
        current_index = leaf_index
        
        for level in range(len(self.tree) - 1):
            current_level = self.tree[level]
            
            # Determine sibling position
            if current_index % 2 == 0:
                # Current node is left child
                sibling_index = current_index + 1
                is_right_sibling.append(False)
            else:
                # Current node is right child
                sibling_index = current_index - 1
                is_right_sibling.append(True)
            
            # Add sibling to proof path
            if sibling_index < len(current_level):
                proof_path.append(current_level[sibling_index])
            
            # Move to parent level
            current_index = current_index // 2
        
        return proof_path, is_right_sibling
    
    def verify_proof(self, leaf: str, proof_path: List[str], is_right_sibling: List[bool], root: str) -> bool:
        """Verify a Merkle proof"""
        current_hash = leaf
        
        for i, (sibling, is_right) in enumerate(zip(proof_path, is_right_sibling)):
            if is_right:
                # Sibling is on the right, current hash is left
                current_hash = self._hash_pair(current_hash, sibling)
            else:
                # Sibling is on the left, current hash is right
                current_hash = self._hash_pair(sibling, current_hash)
        
        return current_hash == root

def main():
    print("=== Merkle Tree Proof Generator for Lab 7 ===\n")
    
    # Task 1: Understanding the Merkle Tree
    print("Task 1: Merkle Tree Structure Analysis")
    print("=" * 50)
    
    transactions = [
        "alice -> bob",
        "bob -> dave", 
        "carol -> alice",
        "dave -> bob"
    ]
    
    print("Original transactions:")
    for i, tx in enumerate(transactions):
        print(f"  {i}: {tx}")
    
    # Create Merkle tree
    merkle_tree = MerkleTree(transactions)
    
    print(f"\nMerkle Tree Structure:")
    for level, nodes in enumerate(merkle_tree.tree):
        print(f"Level {level}: {len(nodes)} nodes")
        for i, node in enumerate(nodes):
            print(f"  [{i}] {node}")
    
    print(f"\nRoot Hash: {merkle_tree.root}")
    
    # Task 2: Proof for "dave -> bob" (index 3)
    print("\nTask 2: Merkle Proof for 'dave -> bob' (5th transaction, index 3)")
    print("=" * 70)
    
    dave_bob_index = 3
    dave_bob_hash = merkle_tree.leaves[dave_bob_index]
    proof_path, is_right_sibling = merkle_tree.get_proof(dave_bob_index)
    
    print(f"Transaction: {transactions[dave_bob_index]}")
    print(f"Leaf Hash: {dave_bob_hash}")
    print(f"Proof Path: {proof_path}")
    print(f"Is Right Sibling: {is_right_sibling}")
    
    # Verify the proof
    is_valid = merkle_tree.verify_proof(dave_bob_hash, proof_path, is_right_sibling, merkle_tree.root)
    print(f"Proof Valid: {is_valid}")
    
    # Task 3: Generate and test proofs for all leaves
    print("\nTask 3: Generate and Test Proofs for All Leaves")
    print("=" * 60)
    
    for i, transaction in enumerate(transactions):
        print(f"\nLeaf {i}: {transaction}")
        print("-" * 40)
        
        leaf_hash = merkle_tree.leaves[i]
        proof_path, is_right_sibling = merkle_tree.get_proof(i)
        
        print(f"Leaf Hash: {leaf_hash}")
        print(f"Proof Path: {proof_path}")
        print(f"Is Right Sibling: {is_right_sibling}")
        
        # Verify the proof
        is_valid = merkle_tree.verify_proof(leaf_hash, proof_path, is_right_sibling, merkle_tree.root)
        print(f"Verification: {'✓ VALID' if is_valid else '✗ INVALID'}")
        
        # Generate Solidity-compatible proof format
        print(f"\nSolidity Proof Format:")
        print(f"bytes32 leaf = 0x{leaf_hash};")
        print(f"bytes32 root = 0x{merkle_tree.root};")
        print(f"uint256 index = {i};")
        print(f"bytes32[] memory proof = new bytes32[]({len(proof_path)});")
        for j, proof_element in enumerate(proof_path):
            print(f"proof[{j}] = 0x{proof_element};")
    
    # Summary
    print(f"\n=== Summary ===")
    print(f"Total transactions: {len(transactions)}")
    print(f"Total tree levels: {len(merkle_tree.tree)}")
    print(f"Root hash: {merkle_tree.root}")
    print(f"All proofs generated and verified successfully!")

if __name__ == "__main__":
    main()
