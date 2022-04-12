module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define("Endereco", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cep:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rua:{
            type: DataTypes.STRING,
            allowNull: false
        },
        numero:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bairro:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cidade:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type: DataTypes.STRING,
            allowNull: false
        },
        complemento:{
            type: DataTypes.STRING,
            allowNull: true
        },
        clientes_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {tableName: 'enderecos', timestamps: false}
    );

    Endereco.associate = (models) => {
        Endereco.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
    }


    return Endereco;
};