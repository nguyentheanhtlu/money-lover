import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Wallet from "./wallet.model";
import TransSubCate from "./trans.subcate.model";

@Entity()

export class User {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "email", type: "nvarchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ name: "password", type: "nvarchar", length: 255, nullable: false })
    password: string;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: true })
    name: string;

    @Column({ name: "image", type: "nvarchar", length: 500, nullable: true })
    image: string;

    @Column({ name: "google_id", type: "nvarchar", length: 500, nullable: true })
        //@ts-ignore
    googleId: string;

    @Column({ name: "facebook_id", type: "nvarchar", length: 500, nullable: true })
        //@ts-ignore
    facebookId: string;

    @Column({ name: "github_id", type: "nvarchar", length: 500, nullable: true })
        //@ts-ignore
    githubId: string;

    @OneToMany(() => Wallet, wallet => wallet.user, {
        cascade: true
    })
    wallets: Wallet[];

    @OneToMany(() => TransSubCate, transSubCate => transSubCate.user, {
        cascade: true
    })
        //@ts-ignore
    transSubCates: TransSubCate[];

    @Column({name: "refresh_token", type: "longtext", nullable: true})
    refreshToken: string;

    @Column({name: "active", type: "boolean", nullable: false, default: false})
    active: boolean
}

export default User;