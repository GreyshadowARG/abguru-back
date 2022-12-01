import pkg from 'mongoose';

const {Schema, model} = pkg

const rewardSchema = new Schema({
    userID: {
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
    email: {
        type: String,
        required: true
    },
    identityNumber: {
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
    ABreward: {
        type: String,
        required: true,
    },
    eliteReward: {
        type: String,
        required: true,
    },
    pointsTaken: {
        type: String,
        required: true
    },
    rewardState: {
        type: String,
        required: true
    },
    denyText: {
        type: String,
        required: true
    },
}, {
    timestamps:true,
    versionKey:false
});


export default model ('Reward', rewardSchema)
