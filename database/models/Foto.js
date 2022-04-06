module.exports = (sequelize, DataTypes) => {
    const Foto = sequelize.define("Foto", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fotourl:{
            type: DataTypes.STRING,
            allowNull: false
        },
        produtos_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
    }, 
    {tableName: 'fotos_produtos', timestamps: false}
    );

    Foto.associate = (models) => {
        Foto.belongsTo(models.Produto, {
            foreignKey: 'produtos_id',
            as: 'produto'
        });
    }

    return Foto;
};