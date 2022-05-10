module.exports = (sequelize, DataTypes) => {
    const ItemCarrinho = sequelize.define("ItemCarrinho", {
        quantidade:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        clientes_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        produtos_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, 
    {tableName: 'itens_carrinho', timestamps: false}
    );

    ItemCarrinho.associate = (models) =>{
        ItemCarrinho.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
        ItemCarrinho.belongsTo(models.Produto, {
            foreignKey: 'produtos_id',
            as: 'produto'
        });
    }

    return ItemCarrinho;
};