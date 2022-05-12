module.exports = (sequelize, DataTypes) => {
    const Cartao = sequelize.define("Cartao", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        numero:{
          type: DataTypes.STRING,
          allowNull: false
        },
        cvv:{
          type: DataTypes.STRING,
          allowNull: false
        },
        validade:{
          type: DataTypes.DATE,
          allowNull: false
        },
        clientes_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    },
    {tableName: 'cartoes', timestamps: false}
    );

    Cartao.associate = (models) => {
        Cartao.hasMany(models.FormaPgto, {
            foreignKey: 'cartoes_id',
            as: 'cartoes'
        });
        Cartao.belongsTo(models.Cliente, {
            foreignKey: 'clientes_id',
            as: 'cliente'
        });
    }

    return Cartao;
};