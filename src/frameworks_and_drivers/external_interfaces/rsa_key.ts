import Rsa from 'node-rsa';
import crypto from 'crypto';

/**
     * generates a key pair value (private, public)
     * @returns KeyPair object
     */
export function generateKeyPair() {
    const rsa_key_generator = new Rsa();
    const rsa_key = rsa_key_generator.generateKeyPair();
    const keyPair = new KeyPair(rsa_key.exportKey('private'), rsa_key.exportKey('public'));
    return keyPair;
}

export function generateHash() {    
    return crypto.createHash('sha256')
        .update(crypto.randomBytes(64))
        .digest('hex');
}

/**
 * Key pair class object
 *
 * @class KeyPair
 */
export class KeyPair {

    private: string;
    public: string;

    /**
     *Creates an instance of KeyPair.
     * @param {string} private private key
     * @param {string} public public key
     * @memberof KeyPair
     */

    constructor(privateKey: string, publicKey: string) {
        this.private = privateKey;
        this.public = publicKey
    }
}

