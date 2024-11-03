import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from './AppError';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                let errorMessage: string = 'An unexpected error occurred.';
                if (err instanceof AppError && typeof err.message === 'string') {
                    errorMessage = err.message; // Usa a mensagem do AppError
                }
                else if (Array.isArray(err.message)) {
                    const validationError = err.message[0];
                    if (validationError?.validation) {
                        // Extrai mensagens de validação
                        const validationMessages = Object.values(validationError.validation);
                        if (validationMessages.length > 0) {
                            // Verifica se a primeira mensagem é uma string
                            const firstMessage = validationMessages[0];
                            if (typeof firstMessage === 'string') {
                                errorMessage = firstMessage;
                            }
                        }
                    }
                }
                // Verifica se err.message contém uma mensagem de erro
                else if (typeof err.message === 'object' && err.message?.error) {
                    errorMessage = err.message.error;
                }
                else if (err.code === 'EREQUEST' && err.number === 2627) {
                    errorMessage = 'The entry already exists. Please check the data.';
                } else if (err.code === 'ER_DUP_ENTRY') {
                    errorMessage = 'A record with the same data already exists. Please check and try again.';
                }


                return throwError(() =>
                    new HttpException(
                        {
                            message: errorMessage,
                            statusCode: err.statusCode || HttpStatus.BAD_REQUEST,
                        },
                        err.statusCode || HttpStatus.BAD_REQUEST,
                    ),
                );
            }),
        );
    }
}
