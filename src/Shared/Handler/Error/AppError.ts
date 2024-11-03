export class AppError {
    public readonly message: string | Array<any>
    public readonly statusCode: number;
    public readonly validator: {
        message: string,
        validation: any,
        property: any
    };

    constructor(message: string | Array<any>, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}