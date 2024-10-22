const { StatusCodes } = require('http-status-codes');
const {Op} = require("sequelize")

const {Booking}=require("../models")
const CrudRepository=require('./crud-repository')
const {Enums} = require('../utils/common')
const AppError = require('../utils/errors/app-error')
const {CANCELLED,BOOKED}=Enums.BOOKING_STATUS

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking)
    }

    async createBooking(data,transcation) {
        const response = await Booking.create(data , {transcation:transcation});
        return response
    }

    async get(data,transaction) {
        const response = await Booking.findByPk(data,{transaction,transcation})
        if(!response) {
            throw new AppError("Unable to find data",StatusCodes.NOT_FOUND)
        }
        return response
    }

    async update(id,data,transaction) {
        const response = await Booking.update(data, {
            where : {
                id:id
            }
        } , {transaction:transaction});
        return response
    }
    
    // cancel booking if 3 conditions specified below do not meet
    async cancelOldBookings(timestamp) {
        const response = await Booking.update({status : CANCELLED} , {
            where : {
                [Op.and] : [
                    {
                        createdAt : {
                            [Op.It] : timestamp
                        }
                    },
                    {
                        status : {
                            [Op.ne] : BOOKED
                        }
                    },
                    {
                        status : {
                            [Op.ne] : CANCELLED
                        }
                    },
                ]
            }
        });
        return response
    }
}

module.exports = {BookingRepository}