'use strict';
const {
  Model
} = require('sequelize');
const {Enums} = require('../utils/common')
const {BOOKED,CANCELLED,INITIATED,PENDING} = Enums.BOOKING_STATUS
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flight_Id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    user_Id: {
      type : DataTypes.INTEGER,
      allowNull:false
    },
    status: {
      type : DataTypes.STRING,
      values: [BOOKED, CANCELLED, INITIATED, PENDING],
      defaultValue: INITIATED,
      allowNull: false
    },
    noofSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost:{
      type: DataTypes.INTEGER,
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};