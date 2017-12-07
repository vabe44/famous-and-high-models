/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        link: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        type: {
			type: DataTypes.ENUM('portfolio', 'poloroid'),
			defaultValue: 'portfolio'
		}
    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
                models.Image.belongsTo(models.Model);
            }
        }
    });
};