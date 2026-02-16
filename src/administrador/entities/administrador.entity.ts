import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity("administrador", {schema: "tituladosv2"})
export class Administrador {
    @Column("varchar", {primary: true, name: "mail", length: 255})
    mail: string;

    @Column("varchar", {name: "nombre", length: 100})
    nombre: string;

    @Column("varchar", {name: "apellido", length: 100})
    apellido: string;
}