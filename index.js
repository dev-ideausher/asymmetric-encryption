const crypto = require('crypto');
const fs = require('fs');

const generateKeyPair = async () => {
    const {publicKey,privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });
    console.log(publicKey);
    console.log(privateKey);
    fs.writeSync(fs.openSync('public.pem', 'w'), publicKey);
    fs.writeSync(fs.openSync('private.pem', 'w'), privateKey);
    console.log('Keys generated');
}
// generateKeyPair();
const encrypt = async (data) => {
    const publicKey = fs.readFileSync('public.pem', 'utf8');
    // console.log(publicKey);
    const buffer = Buffer.from(data);
    const encrypted = await crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

const decrypt = async (data) => {
    const privateKey = fs.readFileSync('private.pem', 'utf8');
    // console.log(privateKey);
    const buffer = Buffer.from(data, 'base64');
    const decrypted = await crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf8');
}

const main = async () => {
    const stringi = {
        payment_source: {
            card: {
                expiry: "2024-12",
                name: "Shaswat Gupta",
                number: 4032038840674695,
                security_code: 806,
                billing_address: {
                    address_line1: "3574 Birch Street",
                    address_line_2: "5",
                    admin_area_1: "Indiana",
                    admin_area_2: "Indianapolis",
                    country_code: "US",
                    postal_code: "46250"
                }
            }
        }
    }
    const data = JSON.stringify(stringi);
    const encryptedData = await encrypt(data);
    console.log(encryptedData);
    const decryptedData = await decrypt(encryptedData);
    console.log(decryptedData);
    console.log(JSON.parse(decryptedData));
}

main();
