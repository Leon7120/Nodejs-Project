var express = require('express');
var router = express.Router();
var controller = require('../controller/pizza.controller.js');
var validator = require('../middleware/validator.js');
var authentication = require('../utils/utils.js')
const axios = require('axios');
const redis = require('redis');

// Block redis connection
// const redisClient = redis.createClient({ socket: { port: 6379 } });
// (async () => {
//     try {
//         await redisClient.connect();
//         console.log('Connected to Redis Server');
//     } catch (err) {
//         console.error(err)
//     }
// })()

router.get('/photo', cacheData);

async function cacheData(req, res) {
    console.log(req.query)
    const albumId = req.query.id
    try {
        const getData = await redisClient.get(`id?id=${albumId}`);
        if (!getData) {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos`,
                { params: { albumId } });
            if (data.length === 0) {
                throw "API returned an empty array";
            }
            redisClient.set(`id?id=${albumId}`, JSON.stringify(data), { NX: true, EX: 180 });
            res.send(data);
        } else {
            results = JSON.parse(getData);
            res.send({
                fromCache: true,
                data: results,
            });
        }
    } catch (err) {
        res.status(404);
    }
}
router.get('/pizza', controller.getAllPizza);
router.get('/pizza/:id', controller.getOnePizza);
router.post('/pizza',validator.pizzaValidator(), controller.createPizza);
router.delete('/pizza/:id', controller.deletePizza);
router.patch('/pizza/:id', validator.updateValidator(), controller.updatePizza);

router.get('/pizza/*', function (req, res) {
    res.redirect('/');
})

module.exports = router;

