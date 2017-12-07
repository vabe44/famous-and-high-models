module.exports = function (sequelize, Sequelize) {

        return sequelize.define('Applicant', {
                id: {
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                },
                first_name: {
                        type: Sequelize.STRING
                },
                last_name: {
                        type: Sequelize.STRING
                },
                email: {
                        type: Sequelize.STRING
                },
                phone: {
                        type: Sequelize.STRING
                },
                address: {
                        type: Sequelize.STRING
                },
                city: {
                        type: Sequelize.STRING
                },
                state: {
                        type: Sequelize.STRING
                },
                dateofbirth: {
                        type: Sequelize.DATE
                },
                message: {
                        type: Sequelize.STRING
                },
                gender: {
                        type: Sequelize.ENUM('female', 'male'),
                },
                height: {
                        type: Sequelize.DECIMAL(10, 2)
                },
                bust: {
                        type: Sequelize.STRING
                },
                waist: {
                        type: Sequelize.DECIMAL(10, 2)
                },
                hips: {
                        type: Sequelize.DECIMAL(10, 2)
                },
                dress: {
                        type: Sequelize.STRING
                },
                shoe: {
                        type: Sequelize.STRING
                },
                hair: {
                        type: Sequelize.STRING
                },
                eyes: {
                        type: Sequelize.STRING
                },
                image1: {
                        type: Sequelize.STRING
                },
                image2: {
                        type: Sequelize.STRING
                },
                image3: {
                        type: Sequelize.STRING
                },
        }, {
                underscored: true,
                getterMethods: {
                        fullName() {
                                return this.first_name + ' ' + this.last_name;
                        }
                },
        });

}