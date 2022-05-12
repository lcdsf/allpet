module.exports = (sequelize, DataTypes) => {
    const Historico = sequelize.define("Historico", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        clientes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, 
    {tableName: 'historicos', timestamps: false}
    );

    Historico.associate = (models) => {
        Historico.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
        Historico.belongsTo(models.Produto, {
            foreignKey: 'produtos_id',
            as: 'produto'
        });
    }

    return Historico;
};