module.exports = (sequelize, DataTypes) => {
        const Cliente = sequelize.define("Cliente", {
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
            telefone:{
                type: DataTypes.STRING,
                allowNull: false
            },
            cpf:{
                type: DataTypes.STRING,
                allowNull: false
            },
            data_cadastro:{
                type: DataTypes.DATE,
                allowNull: false
            }
        }, 
        {tableName: 'clientes', timestamps: false}
        );

        Cliente.associate = (models) => {
            Cliente.hasMany(models.Endereco, {
                foreignKey: 'clientes_id',
                as: 'enderecos'
            });
        }

        return Cliente;
};