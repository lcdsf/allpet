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
        formas_pgto_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {tableName: 'compras', timestamps: false}
    );

    Compra.associate = (models) => {
        Compra.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
        Compra.belongsTo(models.FormaPgto, {
          foreignKey: 'formas_pgto_id',
          as: 'forma_pgto'
        });
        Compra.belongsTo(models.ItemCompra, {
            foreignKey: 'compras_id',
            as: 'item_compra'
        });
        Compra.belongsTo(models.StatusCompra, {
            foreignKey: 'compras_id',
            as: 'status'
        });
        Compra.belongsTo(models.Requerimento, {
            foreignKey: 'compras_id',
            as: 'requerimento'
        });
    }
  
    return Compra;
};