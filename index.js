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
    const encrypted = await crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, buffer);
    return encrypted.toString('base64');
}

const decrypt = async (data) => {
    const privateKey = fs.readFileSync('private.pem', 'utf8');
    // console.log(privateKey);
    const buffer = Buffer.from(data, 'base64');
    const decrypted = await crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, buffer);
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
    // const data = "jeNDi9NMUsUec/KFxTOhmKFpxr7+7tPS+xJcJLcxF51h0RSPiZY1E4BT7n+8DBWDFtDuaZ2cUHXu61wVdoxZTmQtO0I7DuiiSf7IPhrXCe7rBUZLXm0NZ5W0E1cX7Fc5k+pQCC5HbKqcSaKDL4vw4z36h8HmHniKi2Ckia2QtIb3Wy0apjnkyP8Ax686reWiUbAySvuhxw/IxEOQugKH0FKkpdBf0Ysaqz/xWm7Y/DhDtTJ/Nv1X/7I3RHM6/Wxe1qq5MFTBlXeMUTIuHyy4UqvIjZkEH1DEtQRDb8yGn3LZFdxcMx4rBrtUDLkscBqq5dlcWjgCueD+isefB5cO+BAEm3glElSzLem0jUQRPRHZKrEgc1dLUYDRfl/a8H5g+2YB79BbrUKld+lI8MF4p1SDGxykdYOz47tWlroQ2k1mcS1Pxg5yWMShLAI++lxpo6EaPd+LCURL9P4eWsq2YNxWmPb8vF5vBW46KvqgpLIbcwyEtnPisNnID25m/KodGTfdEp0lJ5QEk58vB8vjw03f7yXhZe3XHS0WFF1yZnXb4JUQFdlJiHsTBDPW5xUTDwY3XgBEVhHBlrxmY1ptbKhlymZduO1iwdUGhXBpqSftA/6/Snhc0XIF4i7teXdv/JAB/+jaq0MgiC76Xls3zD3B4oNVamklOUnd2kQm3R0="
    const decryptedData = await decrypt(encryptedData);
    console.log(decryptedData);
    console.log(JSON.parse(decryptedData));
}

main();
