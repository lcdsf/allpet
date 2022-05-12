module.exports = (sequelize, DataTypes) => {
    const ChavePix = sequelize.define("ChavePix", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tipochave:{
            type: DataTypes.STRING,
            allowNull: false
        },
        chave:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {tableName: 'chaves_pix', timestamps: false}
    );

    ChavePix.associate = (models) => {
        ChavePix.hasMany(models.FormaPgto, {
            foreignKey: 'chaves_pix_id',
            as: 'chaves_pix'
        });
    }

    return ChavePix;
};