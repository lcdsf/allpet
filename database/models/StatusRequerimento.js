module.exports = (sequelize, DataTypes) => {
    const StatusRequerimento = sequelize.define("StatusRequerimento", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        data:{
            type: DataTypes.DATE,
            allowNull: false
        },
        requerimentos_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, 
    {tableName: 'status_requerimento', timestamps: false}
    );

    StatusRequerimento.associate = (models) => {
        StatusRequerimento.hasOne(models.Requerimento, {
            foreignKey: 'requerimentos_id',
            as: 'requerimento'
        });
    }

    return StatusRequerimento;
};