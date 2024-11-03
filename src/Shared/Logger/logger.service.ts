import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreBaseService } from 'src/Core/core.service';
import { CoreEntity } from 'src/Core/entities/core.entity';
// import { uniq } from 'lodash'
import { Repository } from 'typeorm';
import { LoggerEntity } from './entity/logger.entity';

@Injectable()
export class LoggerService extends CoreBaseService<LoggerEntity> { // Altere CoreEntity para LoggerEntity
    constructor(
        @InjectRepository(LoggerEntity) repo: Repository<LoggerEntity>
    ) {
        super(repo);
    }

    async logLogger(action: string, entity: string, recordId: number, previous: any, current: any) { // Use camelCase
        try {
            const auditLog = this.repo.create({
                action,
                entity,
                record_id: recordId, // Mantenha o nome se você não alterar a entidade
                previous,
                current,
            });
            await this.repo.save(auditLog);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}