module.exports = (sequelize, DataTypes) => {
    const Compra = sequelize.define("Compra", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        valor:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        data:{
            type: DataTypes.DATE,
            allowNull: false
        },
        clientes_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        forma_pgto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enderecos_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, 
    {tableName: 'compras', timestamps: false}
    );

    Compra.associate = (models) => {
        Compra.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
        Compra.belongsToMany(models.Produto, {
            foreignKey: 'compras_id',
            through: models.ItemCompra,
            //through: 'itens_compras',
            as: 'produtos'
        });
        Compra.hasMany(models.StatusCompra, {
            foreignKey: 'compras_id',
            as: 'statuscompra'
        });
        Compra.hasOne(models.Requerimento, {
            foreignKey: 'compras_id',
            as: 'requerimento'
        });
        Compra.belongsTo(models.Endereco, {
            foreignKey: 'enderecos_id',
            as: 'endereco'
        });
        
    }
  
    return Compra;
};