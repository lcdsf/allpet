module.exports = (sequelize, DataTypes) => {
    const Requerimento = sequelize.define("Requerimento", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        datahora:{
            type: DataTypes.DATE,
            allowNull: false
        },
        motivo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        compras_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {tableName: 'requerimentos', timestamps: false}
    );

    Requerimento.associate = (models) => {
        Requerimento.belongsTo(models.Compra, {
            foreignKey: 'compras_id',
            as: 'compra'
        });
        Requerimento.hasMany(models.StatusRequerimento, {
            foreignKey: 'requerimentos_id',
            as: 'status'
        });
    }
  
    return Requerimento;
};