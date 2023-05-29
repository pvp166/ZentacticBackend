const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

// Declare the Schema of the Mongo model
const keyTokenSchema = Schema({
    name: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    privateToken: {
        type: String,
        required: true,
    },
    publicToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: [],
    }
}, {
    collection: COLLECTION_NAME,
    timeseries: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);