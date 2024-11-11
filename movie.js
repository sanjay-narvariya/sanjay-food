var express = require('express');
var router = express.Router();
var pool = require('./pool.js')

/* GET home page. */

router.get('/show_movie', function (req, res, next) {

  res.render('showmovie')

})



router.get('/get_all_movie', function (req, res, next) {
  pool.query("select * from movies", function (error, result) {

    res.json({ data: result })

  })
});

router.get('/get_all_moviex', function (req, res, next) {
  var q = `select * from movies where moviename like '%${req.query.pattern}%'`
  console.log(q)
  pool.query(q, function (error, result) {
    if (error) {
      console.log(error)
    }
    else {
      res.json({ data: result })
    }


  })
});


router.get('/display_movie', function (req, res) {
  console.log(req.query)
  try {
    pool.query("select * from movies where movieid=?", [req.query.movieid], function (error, result) {
      if (error) {
        console.log(error)
        res.render('displaymovie', { status: false, data: [] })
      }
      else {
        console.log(result[0])
        res.render('displaymovie', { status: true, data: result[0] })
      }

    })
  }
  catch (e) {
    console.log(e)
    res.render('displaymovie', { status: false, data: [] })
  }
})



module.exports = router;
