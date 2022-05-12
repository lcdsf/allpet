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
    //     },
    //     fotourl: {
    //       type: DataTypes.STRING,
    //       allowNull: true
    //     }
    }, 
    {tableName: 'produtos', timestamps: false}
    );

    Produto.associate = (models) => {
        Produto.belongsTo(models.CategoriaEspecifica, {
            foreignKey: 'categorias_especificas_id',
            as: 'categoria'
        });
        Produto.hasMany(models.Avaliacao, {
          foreignKey: 'produtos_id',
          as: 'avaliacoes'
        });
        Produto.belongsToMany(models.Compra, {
          foreignKey: 'produtos_id',
          through: models.ItemCompra,
          //through: 'itens_compras',
          as: 'compras'
        });
        Produto.hasMany(models.Foto, {
          foreignKey: 'produtos_id',
          as: 'fotos'
        });
        Produto.hasMany(models.Historico, {
          foreignKey: 'produtos_id',
          as: 'historicos'
        });
        Produto.hasMany(models.ItemCarrinho, {
          foreignKey: 'produtos_id',
          as: 'carrinhos'
      });
    }
  
    return Produto;
};