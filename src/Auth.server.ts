import * as jose from 'jose';
import { stderr } from 'process';

let privateKey;
let publicKey;
jose.generateKeyPair('PS256')
  .then(({ publicKey: pubK, privateKey: privK }) => {
    publicKey = pubK;
    privateKey = privK;
  }).catch((err) => stderr.write(err));


export const getJWTKey = () => privateKey;
