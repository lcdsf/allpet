module.exports = (sequelize, DataTypes) => {
    const FormaPgto = sequelize.define("FormaPgto", {
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
        cartoes_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        boletos_id: {
          type: DataTypes.INTEGER,
          allowNull: true,

        },
        chaves_pix_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        }
    },
    {tableName: 'formas_pgto', timestamps: false}
    );

    FormaPgto.associate = (models) => {
        FormaPgto.belongsTo(models.Cartao, {
            foreignKey: 'cartoes_id',
            as: 'cartao'
        });
        FormaPgto.belongsTo(models.Boleto, {
            foreignKey: 'boletos_id',
            as: 'boleto'
        });
        FormaPgto.belongsTo(models.ChavePix, {
            foreignKey: 'chaves_pix_id',
            as: 'chave_pix'
        });
        FormaPgto.hasMany(models.Compra, {
            foreignKey: 'formas_pgto_id',
            as: 'formas_pgto'
        });
    }

    return FormaPgto;
};