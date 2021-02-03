export function buildMakeAuthKey(dateHandler: any, idGen: any, generators: any) {
    return function makeAuthKey() {

        /**Create a RSA Key Pair */
        const keyPair = generators.generateKeyPair();

        const authKey: AuthKeyDOM = new AuthKeyDOM(
            idGen(),            
            keyPair.private,
            keyPair.public,
            true,
            dateHandler.utc().add(3, 'months').toDate(),
        );

        return Object.freeze(authKey);
    }
}

export class AuthKeyDOM {

    id: string;
    privateKey: string;
    publicKey: string;
    isActive: boolean;
    validTo: Date;

    constructor(id: string, private_key: string,
        public_key: string, is_active: boolean, valid_to: Date) {
        this.id = id;
        this.privateKey = private_key;
        this.publicKey = public_key;
        this.isActive = is_active;
        this.validTo = valid_to;
    }

    deactivate() {
        this.isActive = false;
        return Object.freeze(this);
    }

}