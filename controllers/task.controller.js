const processSchema = require('../models/process.model');

// generate random number

const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// for finding paticular http method request

const methodStats = async(method, fromDate, toDate) => {
    const data = await processSchema.aggregate([{
        $match: {
            'method': method,
            'date': {
                $gte: new Date(new Date(fromDate).setHours(00, 00, 00)),
                $lte: new Date(new Date(toDate).setHours(23, 59, 59))
            }
        },
    }, {
        $group: { _id: null, totalRequest: { $sum: 1 }, totalResponsetIME: { $sum: '$duration' }, averageResponseTime: { $avg: '$duration' } }
    }])
    return data
}

// give information about http method

exports.process = async(req, res) => {
    try {
        const randomSecondsBetween15to30 = randomNumber(30, 15)
        const data = {
            'date': req._startTime,
            'method': req.method,
            'headers': req.headers,
            'path': req.path,
            'query': req.query,
            'body': req.body,
            'duration': 'You will find in response header as response-time'
        }
        res.data = data
        setTimeout(() => {
            return res.send(data)
        }, randomSecondsBetween15to30)

    } catch (err) {
        return res.status(400).send(err.message)
    }
}

// find stats of http methods

exports.statistics = async(req, res) => {
    try {
        const getStat = await methodStats('GET', req.body.fromDate, req.body.toDate)
        const postStat = await methodStats('POST', req.body.fromDate, req.body.toDate)
        const putStat = await methodStats('PUT', req.body.fromDate, req.body.toDate)
        const patchStat = await methodStats('PATCH', req.body.fromDate, req.body.toDate)
        const deleteStat = await methodStats('DELETE', req.body.fromDate, req.body.toDate)
        const allStats = {
            'getStats': getStat,
            'postStats': postStat,
            'putStats': putStat,
            'patchStats': patchStat,
            'deleteStats': deleteStat
        }

        return res.send(allStats)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}