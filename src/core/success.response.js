const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    OK: 'Success',
    CREATED: 'Created!'
}
class SuccessResponse {
    constructor ({message, statusCode = StatusCode.OK, 
        reasonStatusCode = ReasonStatusCode.OK, metadata = {}}) {
            this.message = !message? reasonStatusCode : message;
            this.status = statusCode;
            this.metadata = metadata;
           
    }
    
    send(res, header = {}) {
        try{
            return res.status(this.status).json(this)
        }
        catch(error){
            console.log(error);
        }
        
    }
}

class OK extends SuccessResponse {
    constructor({message, metadata}) {
        super({ message, metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor({message, statusCode = StatusCode.CREATED, reasonStatusCode, metadata}) {
        super({ message, statusCode, reasonStatusCode, metadata})
    }
}

module.exports = {
    OK, CREATED
}