const mongoose = require('mongoose');
const schema = mongoose.Schema;

const processSchema = new schema({
    date: {
        type: Date,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    headers: {
        type: Object,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    query: {
        type: Object,
        default: null,
        required: true
    },
    body: {
        type: Object,
        default: null,
        required: true
    },
    duration: {
        type: schema.Types.Decimal128,
        required: true
    },
    __v: {
        type: Number,
        select: false
    }
}, { timestamps: true });

module.exports = mongoose.model('process', processSchema)