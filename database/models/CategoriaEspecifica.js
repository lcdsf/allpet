module.exports = (sequelize, DataTypes) => {
    const CategoriaEspecifica = sequelize.define("CategoriaEspecifica", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        categorias_principais_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
    }, 
    {tableName: 'categorias_especificas', timestamps: false}
    );

    CategoriaEspecifica.associate = (models) => {
        CategoriaEspecifica.belongsTo(models.CategoriaPrincipal, {
            foreignKey: 'categorias_principais_id',
            as: 'categoria_principal'
        });
        CategoriaEspecifica.hasMany(models.Produto, {
            foreignKey: 'categorias_especificas_id',
            as: 'produtos'
        });
    }

    return CategoriaEspecifica;
};