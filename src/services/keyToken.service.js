const keyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
    static createKeyToken = async ({ userID, publicKey, privateKey }) => {
        try {

            const tokens = await keyTokenModel.create({
                name: userID,
                privateToken: publicKey, publicToken: privateKey
            });
            return tokens ? tokens : null
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports = KeyTokenService