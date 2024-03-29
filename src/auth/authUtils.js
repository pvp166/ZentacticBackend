const JWT = require('jsonwebtoken');

const createTokenPair = (payload, publicKey, privateKey) => {
    try {
        const accessToken =  JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refeshToken = JWT.sign(payload, privateKey, {
           expiresIn: '7 days'
        });

        JWT.verify(accessToken, publicKey, (error, decode) => {
            if(error) {
                console.log('error verify::', error)
            } else {
                console.log('decode verify::', decode)
            }
        })
        return {accessToken, refeshToken}
    } catch (error) {
        return error
    }
}

module.exports = {
    createTokenPair
}