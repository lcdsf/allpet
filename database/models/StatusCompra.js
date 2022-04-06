module.exports = (sequelize, DataTypes) => {
    const StatusCompra = sequelize.define("StatusCompra", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        data:{
            type: DataTypes.DATE,
            allowNull: false
        },
        compras_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, 
    {tableName: 'itens_compras', timestamps: false}
    );

    StatusCompra.associate = (models) => {
        StatusCompra.belongsTo(models.Compra, {
            foreignKey: 'compras_id',
            as: 'compra'
        });
    }

    return StatusCompra;
};