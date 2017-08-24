const express = require('express');
const path = require('path');
const router = express.Router();
const knex = require('../knex');

router.get('/:term', (req, res, next) => {
  const term = req.params.term;
  var NounProject = require('the-noun-project'),
      nounProject = new NounProject({
          key: process.env.NOUN_PROJ_KEY,
          secret: process.env.NOUN_PROJ_SECRET
      });
  nounProject.getIconsByTerm(term, {limit: 10}, (err, data) => {
    if (err) {
      return res.send(err);
    }
    res.status(200).send(data.icons)
  });
  // knex('images')
  //   .then(results => {
  //     if (results.length === 0) {
  //       return res.send(404);
  //     }
  //     res.status(200).send(results)
  //   })
  //   .catch(error => {
  //     return next(error)
  //   })
})

module.exports = router;
