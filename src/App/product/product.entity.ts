import { ApiProperty } from "@dataui/crud/lib/crud";
import { CoreEntity } from "src/Core/entities/core.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity extends CoreEntity {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;
}
