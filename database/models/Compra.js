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
        datahora:{
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
        Compra.hasOne(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
        Compra.hasOne(models.FormaPgto, {
          foreignKey: 'formas_pgto_id',
          as: 'forma_pgto'
        });
        Compra.hasOne(models.ItemCompra, {
            foreignKey: 'compras_id',
            as: 'item_compra'
        });
        Compra.hasMany(models.StatusCompra, {
            foreignKey: 'compras_id',
            as: 'status'
        });
        Compra.hasOne(models.Requerimento, {
            foreignKey: 'compras_id',
            as: 'requerimento'
        });
    }
  
    return Compra;
};