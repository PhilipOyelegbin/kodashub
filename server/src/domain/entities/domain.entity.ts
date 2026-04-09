import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("domain")
export class Domain {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: false })
    name: string;

    @Column({ nullable: false })
    registrationPeriod: number;

    @Column({ nullable: false })
    registrationPrice: number;

    @Column({ nullable: true })
    renewalPrice?: number;

    @Column({ enum: ["pending", "active", "failed", "suspended", "grace", "redemption", "expired", "cancelled"], default: "pending" })
    status: string;

    @Column({ nullable: true })
    transactionRef?: string;

    @Column({ nullable: true })
    checkOutUrl?: string;

    @ManyToOne(() => User, (user) => user.domains, { onDelete: 'CASCADE' })
    user: User;

    @Column({ nullable: true })
    expiryDate?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
