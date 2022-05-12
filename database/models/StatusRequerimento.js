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
        datahora:{
            type: DataTypes.DATE,
            allowNull: false
        },
        requerimentos_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, 
    {tableName: 'status_requerimentos', timestamps: false}
    );

    StatusRequerimento.associate = (models) => {
        StatusRequerimento.belongsTo(models.Requerimento, {
            foreignKey: 'requerimentos_id',
            as: 'requerimento'
        });
    }

    return StatusRequerimento;
};