module.exports = (sequelize, DataTypes) => {
    const FormaPgto = sequelize.define("FormaPgto", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        cartoes_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        boletos_id: {
          type: Sequelize.INTEGER,
          allowNull: true,

        },
        chaves_pix_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
    },
    {tableName: 'formas_pgto', timestamps: false}
    );

    FormaPgto.associate = (models) => {
        FormaPgto.hasOne(models.Cartao, {
            foreignKey: 'cartoes_id',
            as: 'cartao'
        });
        FormaPgto.hasOne(models.Boleto, {
            foreignKey: 'boletos_id',
            as: 'boleto'
        });
        FormaPgto.hasOne(models.ChavePix, {
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