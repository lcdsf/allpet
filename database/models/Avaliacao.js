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
        Avaliacao.hasOne(models.Produto, {
            foreignKey: 'produtos_id',
            as: 'produto'
        });
        Avaliacao.hasOne(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
    }

    return Avaliacao;
};