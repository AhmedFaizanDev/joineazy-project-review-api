const Joi = require('joi');

const submitReview = {
  body: Joi.object().keys({
    comments: Joi.string().required(),
  }),
};

module.exports = {
  submitReview,
};
