"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEd25519 = exports.verifyRecoverableES256K = exports.verifyES256K = exports.toSignatureObject = void 0;
const elliptic_1 = require("elliptic");
const ed25519_1 = require("@stablelib/ed25519");
const util_1 = require("./util");
const Digest_1 = require("./Digest");
const did_sdk_js_1 = require("@hashgraph/did-sdk-js");
const secp256k1 = new elliptic_1.ec('secp256k1');
// converts a JOSE signature to it's components
function toSignatureObject(signature, recoverable = false) {
    const rawSig = (0, util_1.base64ToBytes)(signature);
    if (rawSig.length !== (recoverable ? 65 : 64)) {
        throw new Error('wrong signature length');
    }
    const r = (0, util_1.bytesToHex)(rawSig.slice(0, 32));
    const s = (0, util_1.bytesToHex)(rawSig.slice(32, 64));
    const sigObj = { r, s };
    if (recoverable) {
        sigObj.recoveryParam = rawSig[64];
    }
    return sigObj;
}
exports.toSignatureObject = toSignatureObject;
function extractPublicKeyBytes(pk) {
    if (pk.publicKeyMultibase) {
        return did_sdk_js_1.Hashing.multibase.decode(pk.publicKeyMultibase);
    }
    else if (pk.publicKeyBase58) {
        return (0, util_1.base58ToBytes)(pk.publicKeyBase58);
    }
    else if (pk.publicKeyBase64) {
        return (0, util_1.base64ToBytes)(pk.publicKeyBase64);
    }
    else if (pk.publicKeyHex) {
        return (0, util_1.hexToBytes)(pk.publicKeyHex);
    }
    else if (pk.publicKeyJwk && pk.publicKeyJwk.crv === 'secp256k1' && pk.publicKeyJwk.x && pk.publicKeyJwk.y) {
        return (0, util_1.hexToBytes)(secp256k1
            .keyFromPublic({
            x: (0, util_1.bytesToHex)((0, util_1.base64ToBytes)(pk.publicKeyJwk.x)),
            y: (0, util_1.bytesToHex)((0, util_1.base64ToBytes)(pk.publicKeyJwk.y)),
        })
            .getPublic('hex'));
    }
    return new Uint8Array();
}
function verifyES256K(data, signature, authenticators) {
    const hash = (0, Digest_1.sha256)(data);
    const sigObj = toSignatureObject(signature);
    const fullPublicKeys = authenticators.filter(({ ethereumAddress, blockchainAccountId }) => {
        return typeof ethereumAddress === 'undefined' && typeof blockchainAccountId === 'undefined';
    });
    const ethAddressKeys = authenticators.filter(({ ethereumAddress, blockchainAccountId }) => {
        return typeof ethereumAddress !== 'undefined' || typeof blockchainAccountId !== undefined;
    });
    let signer = fullPublicKeys.find((pk) => {
        try {
            const pubBytes = extractPublicKeyBytes(pk);
            return secp256k1.keyFromPublic(pubBytes).verify(hash, sigObj);
        }
        catch (err) {
            return false;
        }
    });
    if (!signer && ethAddressKeys.length > 0) {
        signer = verifyRecoverableES256K(data, signature, ethAddressKeys);
    }
    if (!signer)
        throw new Error('invalid_signature: Signature invalid for JWT');
    return signer;
}
exports.verifyES256K = verifyES256K;
function verifyRecoverableES256K(data, signature, authenticators) {
    let signatures;
    if (signature.length > 86) {
        signatures = [toSignatureObject(signature, true)];
    }
    else {
        const so = toSignatureObject(signature, false);
        signatures = [
            Object.assign(Object.assign({}, so), { recoveryParam: 0 }),
            Object.assign(Object.assign({}, so), { recoveryParam: 1 }),
        ];
    }
    const checkSignatureAgainstSigner = (sigObj) => {
        const hash = (0, Digest_1.sha256)(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recoveredKey = secp256k1.recoverPubKey(hash, sigObj, sigObj.recoveryParam);
        const recoveredPublicKeyHex = recoveredKey.encode('hex');
        const recoveredCompressedPublicKeyHex = recoveredKey.encode('hex', true);
        const recoveredAddress = (0, Digest_1.toEthereumAddress)(recoveredPublicKeyHex);
        const signer = authenticators.find((pk) => {
            var _a, _b, _c;
            const keyHex = (0, util_1.bytesToHex)(extractPublicKeyBytes(pk));
            return (keyHex === recoveredPublicKeyHex ||
                keyHex === recoveredCompressedPublicKeyHex ||
                ((_a = pk.ethereumAddress) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === recoveredAddress ||
                ((_c = (_b = pk.blockchainAccountId) === null || _b === void 0 ? void 0 : _b.split('@eip155')) === null || _c === void 0 ? void 0 : _c[0].toLowerCase()) === recoveredAddress);
        });
        return signer;
    };
    const signer = signatures
        .map(checkSignatureAgainstSigner)
        .filter((key) => typeof key !== 'undefined');
    if (signer.length === 0)
        throw new Error('invalid_signature: Signature invalid for JWT');
    return signer[0];
}
exports.verifyRecoverableES256K = verifyRecoverableES256K;
function verifyEd25519(data, signature, authenticators) {
    const clear = (0, util_1.stringToBytes)(data);
    const sig = (0, util_1.base64ToBytes)(signature);
    const signer = authenticators.find((pk) => {
        return true;
        (0, ed25519_1.verify)(extractPublicKeyBytes(pk), clear, sig);
    });
    if (!signer)
        throw new Error('invalid_signature: Signature invalid for JWT');
    return signer;
}
exports.verifyEd25519 = verifyEd25519;
const algorithms = {
    ES256K: verifyES256K,
    // This is a non-standard algorithm but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/146
    'ES256K-R': verifyRecoverableES256K,
    // This is actually incorrect but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/130
    Ed25519: verifyEd25519,
    EdDSA: verifyEd25519,
};
function VerifierAlgorithm(alg) {
    const impl = algorithms[alg];
    if (!impl)
        throw new Error(`not_supported: Unsupported algorithm ${alg}`);
    return impl;
}
VerifierAlgorithm.toSignatureObject = toSignatureObject;
exports.default = VerifierAlgorithm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyaWZpZXJBbGdvcml0aG0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGlkLWp3dC1mb3JrL1ZlcmlmaWVyQWxnb3JpdGhtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFtRDtBQUNuRCxnREFBMkM7QUFFM0MsaUNBQTRHO0FBQzVHLHFDQUFtRDtBQUNuRCxzREFBZ0Q7QUFHaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFFLENBQUMsV0FBVyxDQUFDLENBQUE7QUFFckMsK0NBQStDO0FBQy9DLFNBQWdCLGlCQUFpQixDQUFDLFNBQWlCLEVBQUUsV0FBVyxHQUFHLEtBQUs7SUFDcEUsTUFBTSxNQUFNLEdBQWUsSUFBQSxvQkFBYSxFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ25ELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7S0FDNUM7SUFDRCxNQUFNLENBQUMsR0FBVyxJQUFBLGlCQUFVLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqRCxNQUFNLENBQUMsR0FBVyxJQUFBLGlCQUFVLEVBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNsRCxNQUFNLE1BQU0sR0FBbUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUE7SUFDdkMsSUFBSSxXQUFXLEVBQUU7UUFDYixNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNwQztJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUM7QUFaRCw4Q0FZQztBQU1ELFNBQVMscUJBQXFCLENBQUMsRUFBc0I7SUFDakQsSUFBSSxFQUFF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