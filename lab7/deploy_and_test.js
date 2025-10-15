const { ethers } = require("ethers");

// Mock provider for testing (you can replace with actual provider)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function main() {
    console.log("=== Merkle Proof Deployment and Testing ===\n");
    
    // Contract ABI (simplified for testing)
    const contractABI = [
        "function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf, uint256 index) public pure returns (bool)",
        "function getRoot() public view returns (bytes32)",
        "function getLeafHash(uint256 index) public view returns (bytes32)",
        "function getAllLeafHashes() public view returns (bytes32[4] memory)",
        "function getMerkleRoot() public view returns (bytes32)"
    ];
    
    // Mock deployment (in real scenario, you'd deploy the contract)
    console.log("Task 1: Understanding Merkle Tree Concepts");
    console.log("=" * 50);
    
    // Simulate the Merkle tree construction
    const transactions = [
        "alice -> bob",
        "bob -> dave", 
        "carol -> alice",
        "dave -> bob"
    ];
    
    console.log("Transactions:");
    transactions.forEach((tx, i) => {
        console.log(`  ${i}: ${tx}`);
    });
    
    // Hash the transactions (simulating Solidity keccak256)
    const leafHashes = transactions.map(tx => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(tx)));
    
    console.log("\nLeaf Hashes:");
    leafHashes.forEach((hash, i) => {
        console.log(`  ${i}: ${hash}`);
    });
    
    // Build Merkle tree
    const merkleTree = buildMerkleTree(leafHashes);
    const root = merkleTree[merkleTree.length - 1][0];
    
    console.log(`\nMerkle Root: ${root}`);
    
    // Task 2: Proof for "dave -> bob" (index 3)
    console.log("\nTask 2: Merkle Proof for 'dave -> bob' (index 3)");
    console.log("=" * 50);
    
    const daveBobIndex = 3;
    const daveBobHash = leafHashes[daveBobIndex];
    const proof = generateProof(merkleTree, daveBobIndex);
    
    console.log(`Transaction: ${transactions[daveBobIndex]}`);
    console.log(`Leaf Hash: ${daveBobHash}`);
    console.log(`Proof: ${proof.join(', ')}`);
    
    // Task 3: Generate proofs for all leaves
    console.log("\nTask 3: Generate and Test Proofs for All Leaves");
    console.log("=" * 50);
    
    for (let i = 0; i < transactions.length; i++) {
        console.log(`\nLeaf ${i}: ${transactions[i]}`);
        console.log("-".repeat(30));
        
        const leafHash = leafHashes[i];
        const proofPath = generateProof(merkleTree, i);
        
        console.log(`Leaf Hash: ${leafHash}`);
        console.log(`Proof Path: ${proofPath.join(', ')}`);
        
        // Verify proof
        const isValid = verifyProof(proofPath, root, leafHash, i);
        console.log(`Verification: ${isValid ? '✓ VALID' : '✗ INVALID'}`);
    }
    
    console.log("\n=== All Tasks Completed Successfully! ===");
}

function buildMerkleTree(leaves) {
    const tree = [leaves];
    let currentLevel = leaves;
    
    while (currentLevel.length > 1) {
        const nextLevel = [];
        for (let i = 0; i < currentLevel.length - 1; i += 2) {
            const left = currentLevel[i];
            const right = currentLevel[i + 1];
            const combined = ethers.utils.keccak256(left + right.slice(2));
            nextLevel.push(combined);
        }
        
        // If odd number of nodes, duplicate the last one
        if (currentLevel.length % 2 === 1) {
            nextLevel.push(currentLevel[currentLevel.length - 1]);
        }
        
        tree.push(nextLevel);
        currentLevel = nextLevel;
    }
    
    return tree;
}

function generateProof(tree, leafIndex) {
    const proof = [];
    let currentIndex = leafIndex;
    
    for (let level = 0; level < tree.length - 1; level++) {
        const currentLevel = tree[level];
        
        if (currentIndex % 2 === 0) {
            // Current node is left child
            const siblingIndex = currentIndex + 1;
            if (siblingIndex < currentLevel.length) {
                proof.push(currentLevel[siblingIndex]);
            }
        } else {
            // Current node is right child
            const siblingIndex = currentIndex - 1;
            proof.push(currentLevel[siblingIndex]);
        }
        
        currentIndex = Math.floor(currentIndex / 2);
    }
    
    return proof;
}

function verifyProof(proof, root, leaf, index) {
    let hash = leaf;
    
    for (let i = 0; i < proof.length; i++) {
        if (index % 2 === 0) {
            hash = ethers.utils.keccak256(hash + proof[i].slice(2));
        } else {
            hash = ethers.utils.keccak256(proof[i] + hash.slice(2));
        }
        index = Math.floor(index / 2);
    }
    
    return hash === root;
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
