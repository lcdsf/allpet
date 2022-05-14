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
                as: 'endereco'
            });
            Cliente.hasMany(models.Avaliacao, {
                foreignKey: 'clientes_id',
                as: 'avaliacoes'
            });
            Cliente.hasMany(models.Compra, {
                foreignKey: 'clientes_id',
                as: 'compras'
            });
            Cliente.hasMany(models.Historico, {
                foreignKey: 'clientes_id',
                as: 'itens_historico'
            });
            Cliente.hasMany(models.ItemCarrinho, {
                foreignKey: 'clientes_id',
                as: 'itens_carrinho'
            });
        }

        return Cliente;
};