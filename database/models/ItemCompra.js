module.exports = (sequelize, DataTypes) => {
    const ItemCompra = sequelize.define("ItemCompra", {
        quantidade:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        compras_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        produtos_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, 
    {tableName: 'itens_compras', timestamps: false}
    );

    ItemCompra.associate = (models) =>{
        ItemCompra.belongsTo(models.Produto, {
            foreignKey: 'produtos_id',
            as: 'produto'
        });
        ItemCompra.belongsTo(models.Compra, {
            foreignKey: 'compras_id',
            as: 'compra'
        });
    }

    return ItemCompra;
};