const _ = require('lodash');

const { ValidationError } = require('yup');



const formatValidationError = error => _.chain(error)
  .get(['inner'], [])
  .map(inner => _.pick(inner, ['path', 'message']))
  .value();

module.exports.formatError = error => {

  const { originalError } = error;

  if (_.get(originalError, ['name'], '') === ValidationError.name) {
    error.validationErrors = formatValidationError(originalError);
  }

  return error;

};
