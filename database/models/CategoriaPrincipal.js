module.exports = (sequelize, DataTypes) => {
    const CategoriaPrincipal = sequelize.define("CategoriaPrincipal", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {tableName: 'categorias_principais', timestamps: false}
    );

    CategoriaPrincipal.associate = (models) => {
        CategoriaPrincipal.hasMany(models.CategoriaEspecifica, {
            foreignKey: 'categorias_principais_id',
            as: 'categorias_principais'
        });
    }

    return CategoriaPrincipal;
};