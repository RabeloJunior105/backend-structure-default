
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AppError } from '../Error/AppError';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const newErrors = []
            for (const error of errors) {
                newErrors.push({
                    error: `Validation in ${error.property} failed`,
                    validation: { ...error.constraints },
                    property: {
                        [error.property]: error.target[error.property]
                    }
                })
            }


            throw new AppError(newErrors);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}