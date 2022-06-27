module.exports = (sequelize, DataTypes) => {
    const InvntItem = sequelize.define('InvntItem', {
        ItemName : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        price : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    });

    return InvntItem;
}