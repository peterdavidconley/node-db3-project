const Scheme = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

const checkSchemeId = async (req, res, next) => {

  try {

    const scheme = await Scheme.findById(req.body.params)
    if (!scheme) {
      res.status(404).json({
        message: `scheme with scheme_id ${req.body.params} not found`
      })
    } else {
      next()
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

  if (!req.body.scheme_name) {
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
const validateStep = (req, res, next) => {

}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
