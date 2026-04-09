import { Cart } from "src/cart/entities/cart.entity";
import { Domain } from "src/domain/entities/domain.entity";
import { Log } from "src/log/entities/log.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    companyName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    state: string;

    @Column({ nullable: false })
    country: string;

    @Column({ nullable: false })
    zipCode: string;

    @Column({ nullable: false })
    password: string;

    @Column({ enum: ['super_admin', 'admin', 'user'], default: 'user' })
    role: string;

    @Column({ nullable: true })
    verificationCode?: string;

    @Column({ nullable: true })
    verificationTime?: Date;

    @Column({ nullable: true })
    resetPasswordCode?: string;

    @Column({ nullable: true })
    resetPasswordTime?: Date;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
    cart: Cart[];

    @OneToMany(() => Domain, (domain) => domain.user, { cascade: true })
    domains: Domain[];

    @OneToMany(() => Log, (log) => log.user, { cascade: true })
    logs: Log[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
