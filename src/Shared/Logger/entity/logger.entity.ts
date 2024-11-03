import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/Core/entities/core.entity';
import {
    Column,
    Entity,
} from 'typeorm';


@Entity("logger")
export class LoggerEntity extends CoreEntity {
    @ApiProperty({ type: 'string' })
    @Column({ nullable: false })
    action: string;

    @ApiProperty({ type: 'string' })
    @Column({ nullable: false })
    entity: string;

    @ApiProperty({ type: 'number' })
    @Column({ name: "record_id", nullable: false })
    record_id: number;

    @ApiProperty({ type: 'string' })
    @Column({ nullable: true })
    previous: string;

    @ApiProperty({ type: 'string' })
    @Column({ nullable: true })
    current: string;

}
