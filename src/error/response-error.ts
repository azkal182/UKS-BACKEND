class ResponseError extends Error {

    constructor(status:number, message:string) {
        super(message);
        // @ts-ignore
        this.status = status;
    }
}

export {
    ResponseError
}
