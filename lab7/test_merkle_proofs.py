#!/usr/bin/env python3
"""
Comprehensive Test Suite for Merkle Proofs
This script tests all aspects of the Merkle tree implementation and proof generation.
"""

import hashlib
import json
from typing import List, Tuple, Dict

class MerkleTreeTester:
    def __init__(self):
        self.transactions = [
            "alice -> bob",
            "bob -> dave", 
            "carol -> alice",
            "dave -> bob"
        ]
        self.merkle_tree = None
    
    def keccak256_hash(self, data: str) -> str:
        """Simulate Solidity's keccak256 hash function"""
        return hashlib.sha3_256(data.encode()).hexdigest()
    
    def abi_encode_packed_hash(self, data: str) -> str:
        """Simulate abi.encodePacked and then hash"""
        return self.keccak256_hash(data)
    
    def hash_pair(self, left: str, right: str) -> str:
        """Hash two 32-byte hashes together"""
        # Remove '0x' prefix if present and combine
        left_clean = left[2:] if left.startswith('0x') else left
        right_clean = right[2:] if right.startswith('0x') else right
        
        combined = left_clean + right_clean
        return self.keccak256_hash(combined)
    
    def build_merkle_tree(self) -> List[List[str]]:
        """Build the complete Merkle tree"""
        # Step 1: Hash all leaf transactions
        leaves = []
        for tx in self.transactions:
            leaf_hash = self.abi_encode_packed_hash(tx)
            leaves.append(leaf_hash)
        
        print("Step 1: Leaf hashes generated")
        for i, (tx, hash_val) in enumerate(zip(self.transactions, leaves)):
            print(f"  [{i}] {tx} -> {hash_val}")
        
        # Step 2: Build tree bottom-up
        tree = [leaves]
        current_level = leaves
        
        level = 0
        while len(current_level) > 1:
            level += 1
            next_level = []
            
            print(f"\nStep {level + 1}: Building level {level}")
            for i in range(0, len(current_level) - 1, 2):
                left = current_level[i]
                right = current_level[i + 1]
                parent_hash = self.hash_pair(left, right)
                next_level.append(parent_hash)
                print(f"  [{i//2}] {left[:16]}... + {right[:16]}... -> {parent_hash[:16]}...")
            
            # Handle odd number of nodes
            if len(current_level) % 2 == 1:
                last_node = current_level[-1]
                next_level.append(last_node)
                print(f"  [{len(next_level)-1}] Odd node: {last_node[:16]}...")
            
            tree.append(next_level)
            current_level = next_level
        
        self.merkle_tree = tree
        return tree
    
    def get_proof_for_leaf(self, leaf_index: int) -> Tuple[List[str], List[bool]]:
        """Generate Merkle proof for a specific leaf"""
        if not self.merkle_tree:
            self.build_merkle_tree()
        
        proof_path = []
        is_right_sibling = []
        current_index = leaf_index
        
        print(f"\nGenerating proof for leaf {leaf_index} ({self.transactions[leaf_index]})")
        
        for level in range(len(self.merkle_tree) - 1):
            current_level = self.merkle_tree[level]
            
            if current_index % 2 == 0:
                # Current node is left child
                sibling_index = current_index + 1
                is_right_sibling.append(False)
                print(f"  Level {level}: Position {current_index} (left) -> sibling at {sibling_index}")
            else:
                # Current node is right child  
                sibling_index = current_index - 1
                is_right_sibling.append(True)
                print(f"  Level {level}: Position {current_index} (right) -> sibling at {sibling_index}")
            
            if sibling_index < len(current_level):
                proof_path.append(current_level[sibling_index])
                print(f"    Added to proof: {current_level[sibling_index][:16]}...")
            
            current_index = current_index // 2
        
        return proof_path, is_right_sibling
    
    def verify_proof(self, leaf_hash: str, proof_path: List[str], 
                    is_right_sibling: List[bool], root: str) -> bool:
        """Verify a Merkle proof"""
        current_hash = leaf_hash
        
        print(f"\nVerifying proof:")
        print(f"  Leaf: {leaf_hash[:16]}...")
        print(f"  Root: {root[:16]}...")
        
        for i, (sibling, is_right) in enumerate(zip(proof_path, is_right_sibling)):
            if is_right:
                new_hash = self.hash_pair(sibling, current_hash)
                print(f"  Step {i+1}: {sibling[:16]}... + {current_hash[:16]}... -> {new_hash[:16]}...")
            else:
                new_hash = self.hash_pair(current_hash, sibling)
                print(f"  Step {i+1}: {current_hash[:16]}... + {sibling[:16]}... -> {new_hash[:16]}...")
            
            current_hash = new_hash
        
        is_valid = current_hash == root
        print(f"  Result: {'✓ VALID' if is_valid else '✗ INVALID'}")
        return is_valid
    
    def run_comprehensive_test(self):
        """Run all tests"""
        print("=" * 80)
        print("COMPREHENSIVE MERKLE TREE TEST SUITE")
        print("=" * 80)
        
        # Task 1: Build and understand the tree
        print("\nTASK 1: Building Merkle Tree")
        print("-" * 40)
        tree = self.build_merkle_tree()
        root = tree[-1][0]
        print(f"\nFinal Root: {root}")
        
        # Task 2: Generate proof for "dave -> bob" (index 3)
        print("\nTASK 2: Proof for 'dave -> bob' (index 3)")
        print("-" * 40)
        
        dave_bob_index = 3
        dave_bob_hash = tree[0][dave_bob_index]
        proof_path, is_right_sibling = self.get_proof_for_leaf(dave_bob_index)
        
        print(f"\nProof Summary for 'dave -> bob':")
        print(f"  Transaction: {self.transactions[dave_bob_index]}")
        print(f"  Leaf Hash: {dave_bob_hash}")
        print(f"  Proof Length: {len(proof_path)}")
        print(f"  Proof Path: {[p[:16] + '...' for p in proof_path]}")
        
        # Verify the proof
        is_valid = self.verify_proof(dave_bob_hash, proof_path, is_right_sibling, root)
        
        # Task 3: Generate and test proofs for all leaves
        print("\nTASK 3: Proofs for All Leaves")
        print("-" * 40)
        
        all_proofs_valid = True
        for i, transaction in enumerate(self.transactions):
            print(f"\n--- Leaf {i}: {transaction} ---")
            
            leaf_hash = tree[0][i]
            proof_path, is_right_sibling = self.get_proof_for_leaf(i)
            
            print(f"Leaf Hash: {leaf_hash[:16]}...")
            print(f"Proof: {[p[:16] + '...' for p in proof_path]}")
            
            is_valid = self.verify_proof(leaf_hash, proof_path, is_right_sibling, root)
            if not is_valid:
                all_proofs_valid = False
            
            print(f"Verification: {'✓ VALID' if is_valid else '✗ INVALID'}")
        
        # Summary
        print("\n" + "=" * 80)
        print("FINAL SUMMARY")
        print("=" * 80)
        print(f"Total transactions: {len(self.transactions)}")
        print(f"Tree levels: {len(tree)}")
        print(f"Root hash: {root[:16]}...")
        print(f"All proofs valid: {'✓ YES' if all_proofs_valid else '✗ NO'}")
        
        # Generate Solidity test data
        print(f"\nSolidity Test Data:")
        print(f"bytes32 root = 0x{root};")
        for i, transaction in enumerate(self.transactions):
            leaf_hash = tree[0][i]
            proof_path, _ = self.get_proof_for_leaf(i)
            print(f"\n// Proof for '{transaction}' (index {i})")
            print(f"bytes32 leaf{i} = 0x{leaf_hash};")
            print(f"bytes32[] memory proof{i} = new bytes32[]({len(proof_path)});")
            for j, proof_element in enumerate(proof_path):
                print(f"proof{i}[{j}] = 0x{proof_element};")

def main():
    tester = MerkleTreeTester()
    tester.run_comprehensive_test()

if __name__ == "__main__":
    main()
