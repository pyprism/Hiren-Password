var express = require('express');
var router = express.Router();
var cons = require('consolidate');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Add New Data',
        author: {name: 'Lemmy Kilmister', age:67},
        message: 'It seems that our brave new world is becoming less tolerant, spiritual and educated than it ever was when I was young.'
    });
});

router.get('/new', function(req, res){
    res.render('newdata', {
        title: 'Add new data'
    })
})



module.exports = router;
