module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define("Produto", {
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
        preco:{
          type: DataTypes.FLOAT,
          allowNull: false
        },
        descricao:{
          type: DataTypes.STRING,
          allowNull: false
        },
        quantidade:{
          type: DataTypes.INTEGER,
          allowNull: false
        },
        categorias_especificas_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    }, 
    {tableName: 'produtos', timestamps: false}
    );

    Produto.associate = (models) => {
        Produto.hasOne(models.CategoriaEspecifica, {
            foreignKey: 'categorias_especificas_id',
            as: 'categoria'
        });
        Produto.hasMany(models.Avaliacao, {
          foreignKey: 'produtos_id',
          as: 'avaliacoes'
        });
    }
  
    return Produto;
};