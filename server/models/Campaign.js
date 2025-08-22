import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Campaign = sequelize.define(
    "Campaign",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deskripsi_singkat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        target_donasi: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        terkumpul: {
            type: DataTypes.DECIMAL(10, 2),
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gambar: {
            type: DataTypes.STRING,
        },
        dibuat_pada: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        kategor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "campaigns",
    }
);

export default Campaign;
