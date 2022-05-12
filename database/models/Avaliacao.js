module.exports = (sequelize, DataTypes) => {
    const Avaliacao = sequelize.define("Avaliacao", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING,
            allowNull: false
        },
        datahora:{
            type: DataTypes.DATE,
            allowNull: false
        },
        nota:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        produtos_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        clientes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, 
    {tableName: 'avaliacoes', timestamps: false}
    );

    Avaliacao.associate = (models) => {
        Avaliacao.belongsTo(models.Produto, {
            foreignKey: 'produtos_id',
            as: 'produto'
        });
        Avaliacao.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
    }

    return Avaliacao;
};