import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("cart")
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'jsonb', nullable: false })
    product: { name: string, price: number, regPeriod: number, nameservers: string[] };

    @ManyToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
