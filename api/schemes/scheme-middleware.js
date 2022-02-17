const Scheme = require('./scheme-model');
const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

const checkSchemeId = (req, res, next) => {

    
      const scheme = db('schemes')
        .where('scheme_id', req.params.scheme_id)
        .first()

      if (!scheme) {
        res.status(404).json({
          message: `scheme with scheme_id ${req.params.scheme_id} not found`
        })
      } else {
     
      next()

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
const validateStep =  async (req, res, next) => {

  const { instructions, step_number } =  await req.body

  try {
  if (
      !instructions || 
      instructions === '' || 
      typeof instructions !== 'string' || 
      typeof step_number !== 'number' ||
      step_number < 1
    ) 
    {
      const error = { status: 400, message: 'invalid step'}
      next(error)

  } else {
    next()
  } 
  }
  catch (err) {
    next(err)
  }

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
