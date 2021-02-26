import _ from 'lodash';

import { ValidationError } from 'yup';



const formatValidationError = error => _.chain(error)
  .get(['inner'], [])
  .map(inner => _.pick(inner, ['path', 'message']))
  .value();


export const formatError = error => {

  const { originalError } = error;

  if (_.get(originalError, ['name'], '') === ValidationError.name) {
    error.validationErrors = formatValidationError(originalError);
  }

  return error;

};
