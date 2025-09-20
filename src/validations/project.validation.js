const Joi = require('@hapi/joi');

const createProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    summary: Joi.string().required(),
  }),
  file: Joi.object().keys({
    path: Joi.string().required(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
};

const reviewProject = {
  params: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    comments: Joi.string().required(),
    status: Joi.string().valid('approved', 'rejected').required(),
  }),
};

const submitProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    summary: Joi.string().required(),
  }),
};

module.exports = {
  createProject,
  getProject,
  reviewProject,
  submitProject,
};
