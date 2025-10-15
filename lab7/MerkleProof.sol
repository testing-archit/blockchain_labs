// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MerkleProof {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf,
        uint256 index
    ) public pure returns (bool) {
        bytes32 hash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];
            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }
            index = index / 2;
        }
        return hash == root;
    }
}

contract TestMerkleProof is MerkleProof {
    bytes32[] public hashes;
    
    constructor() {
        string[4] memory transactions = [
            "alice -> bob", 
            "bob -> dave", 
            "carol -> alice", 
            "dave -> bob"
        ];
        
        // Step 1: Hash all leaf transactions
        for (uint256 i = 0; i < transactions.length; i++) {
            hashes.push(keccak256(abi.encodePacked(transactions[i])));
        }
        
        // Step 2: Build the Merkle tree bottom-up
        uint256 n = transactions.length;
        uint256 offset = 0;
        while (n > 0) {
            for (uint256 i = 0; i < n - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(
                            hashes[offset + i], 
                            hashes[offset + i + 1]
                        )
                    )
                );
            }
            offset += n;
            n = n / 2;
        }
    }
    
    function getRoot() public view returns (bytes32) {
        return hashes[hashes.length - 1];
    }
    
    function getLeafHash(uint256 index) public view returns (bytes32) {
        require(index < 4, "Index out of bounds");
        return hashes[index];
    }
    
    function getHashesLength() public view returns (uint256) {
        return hashes.length;
    }
    
    function getHash(uint256 index) public view returns (bytes32) {
        require(index < hashes.length, "Index out of bounds");
        return hashes[index];
    }
    
    // Helper function to get all leaf hashes
    function getAllLeafHashes() public view returns (bytes32[4] memory) {
        return [hashes[0], hashes[1], hashes[2], hashes[3]];
    }
    
    // Helper function to get the Merkle root
    function getMerkleRoot() public view returns (bytes32) {
        return hashes[hashes.length - 1];
    }
    
    /* 
    Example verification for 3rd leaf (index 2):
    Leaf: "carol -> alice"
    Hash: 0xdca3326ad7e8121bf9cf9c12333e6b2271abe823ec9edfe42f813b1e768fa57b
    Root: 0xcc086fcc038189b4641db2cc4f1de3bb132aefbd65d510d817591550937818c7
    Index: 2
    Proof: 
    [0x8da9e1c820f9dbd1589fd6585872bc1063588625729e7ab0797cfc63a00bd950,
     0x995788ffc103b987ad50f5e5707fd094419eb12d9552cc423bd0cd86a3861433]
    */
}
