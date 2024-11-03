import { Controller, Type } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Repository } from 'typeorm';
import { CoreBaseService } from './core.service';

export abstract class BaseController<T> {
    constructor(
        public service: CoreBaseService<T>
    ) { }
}

export function CoreBaseController<T>(
    entity: Type<T>,
    crudOptions?: Record<string, any>,
): Type<BaseController<T>> {
    @Crud({
        model: {
            type: entity,
        },
        routes: {
            deleteOneBase: {
                returnDeleted: true,
            }
        },
        ...crudOptions,
        query: {
            alwaysPaginate: true,
            // limit: 20,
            ...crudOptions.query,
        },

    })
    @Controller('base')
    class CrudBaseControllerClass implements CrudController<T> {
        private readonly repository: Repository<T>;
        constructor(
            public service: CoreBaseService<T>
        ) { }

    }
    return CrudBaseControllerClass;
}

