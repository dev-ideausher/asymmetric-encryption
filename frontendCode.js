var encrypt = new JSEncrypt();
const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEAr0BgX/pkmMFH3PyVO6CG1jE2HQkES1KkhOp4OlqrMMLELmuPoRvx
OVcSxheTKQG7nGwCUmdJ3UWpOZUaUQqriWqTnj0GMiSsJyXj5Vaa+tTDlbUdydIS
slyN/FSim/VoRw+1+jpKKcj2fyTVHEdOCUZ0xggljhxcveRiLem6cQbPpB9r1EDe
j1eVb1AAVsEnbWAZGWHtI3NIM5Va/iwVypC8Ot/nSRMAekC9Q6S7AV20+U/Jt8zg
uKJfXmvy61Ljc0M3Pp2xl8leE8dVug0kuvNQiZHTQsK0QiyRbdyVL+ogBov/WaoM
3zdgFmVn+doNVZSx11ZO/UWTDnDqLRo1LGtHqHCN91jwnuw3nbywAeeOYNPU9N56
EQMKQmVQJhPq8GSAhXDmjBNaSmJBK5YTPnx1hdgipzj8neRRUK30L1wfy6YIWSIB
5mV0aNZm+oxw+jfSe78h6al1XRaopR6ymxxXe9oOh/1bX33a6WbzlZgSbaOqPHki
yCisTJon6EGhOkd2XaVn7tmhgmmx4XPoOBYpifa+96AEfsRR8hmfkxFcvxuL1vOn
Hkj+QEv4sOzg5VZJCPVcB+/rlZziG6bd+NVZSIAG+3mmbqbS5PscTewrozF0Fmq5
KBmsSEd8bD240qreVBgh1kWWB2mETT7CfJtVY5Ow4nWf372+AeE40/sCAwEAAQ==
-----END RSA PUBLIC KEY-----`
encrypt.setPublicKey(publicKey);
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
var encrypted = encrypt.encrypt(data);
console.log(encrypted);
