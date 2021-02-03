/**
 * 
 * @param authkeyrepo Repository of Auth keys
 */
export function build(authkeyrepo: any, jwt: any) {
    return async function execute(token: string) {
        /**Decode token */
        token = token.replace(/Bearer /g, '');
        const tokenDec: any = jwt.decode(token, { complete: true });
        /**Obtain user authkey from kid present in token */
        const search = {
            id : tokenDec.header.kid
        }
        const authKey: any = await authkeyrepo.getItem(search);
        /**Verify token and return the payload in the token */              
        let jwtPayload: any = jwt.verify(
            token,
            authKey.publicKey, 
            {
                algorithms: [process.env.KEY_ALGORITHM],
                issuer: process.env.ISSUER,
                ignoreNotBefore: true,
                clockTolerance: 300
            }
        );
        return jwtPayload;
    }
}