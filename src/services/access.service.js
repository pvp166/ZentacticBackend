const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, ConflictRequestError, InternalServerError, AuthFailureError } = require('../core/error.response');

const RoleUser = {
    USER: 'USER',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

//service
const { findByEmail } = require('./user.service');
class AccessService {
    /*
        1 - check email in dbs
        2 - watch password
        3 - create PT vs RT and save
        4 - generate tokens
        5 - get data return login
    */
    static login = async ({ email, password, refreshToken = null }) => {
        const foundUser = await findByEmail({ email });
        if (!foundUser) throw new BadRequestError('User not registered');

        const match = bcrypt.compare(password, foundUser.password);
        if (!match) throw new AuthFailureError('Authentication Error');

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const tokens = await createTokenPair({
            userID: foundUser._id, email
        }, publicKey, privateKey);

        return {
            code: 201,
            metadata: {
                user: getInfoData({
                    fields: ['_id', 'name', 'email'],
                    object: newUser
                }),
                tokens
            }
        }
    }
    static signup = async (req, res, next) => {

        const { email, name, password } = req
        const holderUser = await userModel.findOne({ email }).lean();
        console.log(holderUser)
        if (holderUser) {
            throw new BadRequestError('Error: User already registered');
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name, email, password: passwordHash, roles: [RoleUser.USER]
        })
        if (newUser) {
            //Create privateKey, PublicKey
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // });
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            const keyStore = await KeyTokenService.createKeyToken({
                userID: newUser._id,
                publicKey, privateKey
            });
            if (!keyStore) {
                throw new InternalServerError('Error: Keystore Error');
            }
            // const publicKeyObject= crypto.createPublicKey(publicKeyString )
            //create token pair 
            const tokens = await createTokenPair({
                userID: newUser._id, email
            }, publicKey, privateKey);

            // save collection store key
            return {
                code: 201,
                metadata: {
                    user: getInfoData({
                        fields: ['_id', 'name', 'email'],
                        object: newUser
                    }),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        };

    }
}
module.exports = AccessService