class HelperUtils {
    statusCode;
    type;
    data;
    message;

    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    setSuccess(data, message, statusCode = 200) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
        this.type = 'success';
    }

    setError(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
        this.type = 'error';
    }

    send(res) {
        const result = {status: this.type, message: this.message, data: this.data};
        if (this.type === 'success') {
            return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({status: this.type, message: this.message})
    }
}

export default HelperUtils;
