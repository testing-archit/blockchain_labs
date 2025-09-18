import os
import hashlib
import base58
from ecdsa import SigningKey, SECP256k1
from Crypto.Hash import RIPEMD160  # PyCryptodome's RIPEMD-160

# Step 1: Generate a random private key (32 bytes)
private_key = os.urandom(32)  # Generate a secure 256-bit private key
private_key_hex = private_key.hex()
print(f"\n Step 1: Private Key (HEX):\n {private_key_hex}")

# Step 2: Compute the Public Key (Compressed Format)
sk = SigningKey.from_string(private_key, curve=SECP256k1)
vk = sk.get_verifying_key()
x = vk.to_string()[:32]
y = vk.to_string()[32:]

# Compressed public key: prefix 02 if y is even, 03 if odd
prefix = b'\x02' if (y[-1] % 2 == 0) else b'\x03'
compressed_public_key = prefix + x
print(f"\n Step 2: Compressed Public Key:\n {compressed_public_key.hex()}")

# Step 3: Compute SHA-256 of the Compressed Public Key
sha256_hash = hashlib.sha256(compressed_public_key).digest()
print(f"\n Step 3: SHA-256 Hash:\n {sha256_hash.hex()}")

# Step 4: Compute RIPEMD-160 of the SHA-256 Hash
ripemd160 = RIPEMD160.new()
ripemd160.update(sha256_hash)
public_key_hash = ripemd160.digest()
print(f"\n Step 4: RIPEMD-160 Hash (Public Key Hash):\n {public_key_hash.hex()}")

# Step 5: Add the Testnet Version Byte (0x6f)
versioned_payload = b'\x6f' + public_key_hash
print(f"\n Step 5: Versioned Payload (0x6f + PubKey Hash):\n {versioned_payload.hex()}")

# Step 6: Perform First SHA-256 on the Versioned Payload
checksum_step1 = hashlib.sha256(versioned_payload).digest()
print(f"\n Step 6: First SHA-256 Hash:\n {checksum_step1.hex()}")

# Step 7: Perform Second SHA-256 on the Previous SHA-256
checksum_step2 = hashlib.sha256(checksum_step1).digest()
print(f"\n Step 7: Second SHA-256 Hash:\n {checksum_step2.hex()}")

# Step 8: Extract First 4 Bytes as Checksum
checksum = checksum_step2[:4]
print(f"\n Step 8: Checksum (First 4 bytes):\n {checksum.hex()}")

# Step 9: Append Checksum to Versioned Payload
binary_address = versioned_payload + checksum
print(f"\n Step 9: Final Binary Bitcoin Address (Before Encoding):\n {binary_address.hex()}")

# Step 10: Encode Using Base58Check to Get the Final Testnet Bitcoin Address
bitcoin_address = base58.b58encode(binary_address).decode()
print(f"\n Bitcoin Testnet Address (Compressed, Base58Check):\n {bitcoin_address}")
