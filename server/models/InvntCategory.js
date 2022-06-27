module.exports = (sequelize, DataTypes) => {
    const InvntCategory = sequelize.define('InvntCategory', {
        CatName : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
        },
        description : {
            type : DataTypes.STRING,
            allowNull : false,
        }
    });

    InvntCategory.associate = (models) => {
        InvntCategory.hasMany(models.InvntItem, {
            onDelete : 'cascade',
        });
    };

    return InvntCategory;
}