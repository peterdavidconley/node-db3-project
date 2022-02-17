const Scheme = require('./scheme-model');
const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

const checkSchemeId = async (req, res, next) => {

    try {

      const scheme = await db('schemes')
        .where('scheme_id', req.params.scheme_id)
        .first()

      if (!scheme) {
        res.status(404).json({
          message: `scheme with scheme_id ${req.params.scheme_id} not found`
        })
      } 

    } catch (err) {
      next(err)
    }

    
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {

  if (!req.body.scheme_name || req.body.scheme_name === '' || typeof req.body.scheme_name !== 'string') {
    res.status(400).json({
      message: 'invalid scheme_name',
    })
  } 
  next()

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {

  const { instructions } = await req.body
  const { step_number } = await req.body

  try {

  if (!instructions || instructions === '' || typeof instructions !== 'string') {
    res.status(400).json({
      message: 'invalid step',
    })
  } else if (typeof step_number !== 'integer' || step_number < 1) {
    res.status(400).json({
      message: 'invalid step',
    })
  }
  
  } catch (err) {
    next(err)
  }

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
