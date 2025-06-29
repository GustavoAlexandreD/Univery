const CryptoJS = require("crypto-js");

const Helpers = {
    crypto: (senha) => {
        const hash = CryptoJS.SHA256(senha).toString();
        return hash;
    }
}

module.exports = Helpers;