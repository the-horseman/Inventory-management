module.exports = (sequelize, DataTypes) => {
    const InvntUser = sequelize.define('InvntUser', {
        username : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        phoneNo : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    });

    InvntUser.associate = (models) => {
        InvntUser.hasMany(models.InvntItem, {
            onDelete : 'cascade',
        });
        InvntUser.hasMany(models.InvntCategory, {
            onDelete : 'cascade',
        });
    };

    return InvntUser;
}