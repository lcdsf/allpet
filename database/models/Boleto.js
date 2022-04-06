module.exports = (sequelize, DataTypes) => {
    const Boleto = sequelize.define("Boleto", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        linhadigitavel:{
            type: DataTypes.STRING,
            allowNull: false
        },
        datavencto:{
            type: DataTypes.STRING,
            allowNull: false
        },
        clientes_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
    }, 
    {tableName: 'boletos', timestamps: false}
    );

    Boleto.associate = (models) => {
        Boleto.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
        Boleto.belongsTo(models.FormaPgto, {
            foreignKey: 'boletos_id',
            as: 'boleto'
        });
    }

    return Boleto;
};