import * as jose from 'jose';
import { stderr } from 'process';

let privateKey;
// eslint-disable-next-line no-unused-vars
let publicKey;
jose.generateKeyPair('PS256')
  .then(({ publicKey: pubK, privateKey: privK }) => {
    publicKey = pubK;
    privateKey = privK;
  }).catch((err) => stderr.write(err));

// eslint-disable-next-line import/prefer-default-export
export const getJWTKey = () => privateKey;
