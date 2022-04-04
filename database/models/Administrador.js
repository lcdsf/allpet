module.exports = (sequelize, DataTypes) => {
    const Administrador = sequelize.define("Administrador", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        sobrenome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        data_cadastro:{
            type: DataTypes.DATE,
            allowNull: false
        }
    }, 
    {tableName: 'administradores', timestamps: false}
    );

    return Administrador;
};