import os
import ecdsa
import hashlib
import base58

# Step 1: Generate private key
private_key = os.urandom(32)
print("Private Key (hex):", private_key.hex())
print("Private Key size:", len(private_key), "bytes")

# Step 2: Generate public key (compressed)
sk = ecdsa.SigningKey.from_string(private_key, curve=ecdsa.SECP256k1)
vk = sk.get_verifying_key()
public_key = b'\x02' + vk.to_string()[:32] if vk.pubkey.point.y() % 2 == 0 else b'\x03' + vk.to_string()[:32]
print("Public Key (compressed hex):", public_key.hex())
print("Public Key size:", len(public_key), "bytes")

# Step 3: Hash public key -> RIPEMD160(SHA256(pubkey))
sha256_pubkey = hashlib.sha256(public_key).digest()
ripemd160 = hashlib.new('ripemd160', sha256_pubkey).digest()
print("Public Key Hash (hex):", ripemd160.hex())
print("Public Key Hash size:", len(ripemd160), "bytes")

# Step 4: Add version byte (Testnet P2PKH = 0x6f)
versioned_payload = b'\x6f' + ripemd160

# Step 5: Compute checksum (first 4 bytes of double SHA-256)
checksum = hashlib.sha256(hashlib.sha256(versioned_payload).digest()).digest()[:4]

# Step 6: Append checksum
full_payload = versioned_payload + checksum

# Step 7: Base58 encoding
address = base58.b58encode(full_payload).decode()
print("Compressed Testnet Bitcoin Address:", address)
