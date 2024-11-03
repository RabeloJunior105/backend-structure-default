import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { uniq } from 'lodash';
import { Repository } from 'typeorm';
import { QueryOptions } from '@dataui/crud';
import { ParsedRequestParams } from '@dataui/crud-request';
@Injectable()
export class CoreBaseService<TEntity> extends TypeOrmCrudService<TEntity> {
    constructor(
        repo: Repository<TEntity>
    ) {
        super(repo);
    }

    getSelect(query: ParsedRequestParams, options: QueryOptions) {
        return uniq(super.getSelect(query, options));
    }

}
