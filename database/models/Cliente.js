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
            },
            fotourl:{
                type: DataTypes.STRING,
                allowNull: true
            }
        }, 
        {tableName: 'clientes', timestamps: false}
        );

        Cliente.associate = (models) => {
            Cliente.hasMany(models.Endereco, {
                foreignKey: 'clientes_id',
                as: 'enderecos'
            });
            Cliente.hasMany(models.Avaliacao, {
                foreignKey: 'clientes_id',
                as: 'avaliacoes'
            });
            Cliente.hasMany(models.Boleto, {
                foreignKey: 'clientes_id',
                as: 'boletos'
            });
            Cliente.hasMany(models.Cartao, {
                foreignKey: 'clientes_id',
                as: 'cartoes'
            });
            Cliente.hasMany(models.Compra, {
                foreignKey: 'clientes_id',
                as: 'compras'
            });
        }

        return Cliente;
};