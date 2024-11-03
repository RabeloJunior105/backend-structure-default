import { ApiProperty } from "@dataui/crud/lib/crud";
import { IsEmail } from "class-validator";
import { CoreEntity } from "src/Core/entities/core.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "user" })
export class UserEntity extends CoreEntity {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;
}
