import pkg from 'mongoose';

const {Schema, model} = pkg

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    identityNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true,
    },
    reachBy: {
        type: String,
        required: true
    },
    pointsEarned: {
        type: String,
        required: true
    },
    eliteNights: {
        type: String,
        required: true
    },
    AB_Prize: {
        type: Array,
        required: true
    },
    famTripChance: {
        type: String,
        required: true
    },
    roles: {
      User: Number,
      Validator: Number,
      Admin: Number
    },
    refreshToken: String
}, {
    timestamps:true,
    versionKey:false
});


export default model ('User', userSchema)
