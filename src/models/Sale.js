import pkg from 'mongoose'
const {Schema, model} = pkg

const saleSchema = new Schema({
    tipoAgente: {
        type: String,
        required: true
    },
    procesadaPor: {
        type: String,
        required: true
    },    
    fechaCheckIn : {
        type: String,
        required: true
    },
    fechaCheckOut : {
        type: String,
        required: true
    },
    hotelSelector: {
        type: String,
        required: true
    },
    AB_Hotel: {
        type: String,
        required: true
    },
    rewardAB: {
        type: String,
        required: true
    },
    rewardElite: {
        type: String,
        required: true
    },
    validacionAB: {
        type: String,
        required: true
    },
    validacionElite: {
        type: String,
        required: true
    },
    nightsQuantity: {
        type: String,
        required: true
    },
    reserveAmount: {
        type: String,
        required: true
    },
    famTripChance: {
        type: String,
        required: true
    },
    catHabitacion: {
        type: String,
        required: true
    },
    codigoReserva: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    identityNumber: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    correctionTextAB: {
        type: String,
        required: true
    },
    correctionTextElite: {
        type: String,
        required: true
    }
},{
    timeStamps: true,
    versionKey: false
})

export default model('Sale', saleSchema)