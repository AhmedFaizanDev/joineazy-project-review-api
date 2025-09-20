const express = require('express');
const { submitProject, getAllProjects } = require('../controllers/project.controller');
const { submitReview } = require('../controllers/review.controller');
const auth = require('../middlewares/auth');
const multer = require('multer');
const { grantAccess } = require('../middlewares/validateAccessControl');
const { resources } = require('../config/roles');
const validate = require('../middlewares/validate');
const reviewValidation = require('../validations/review.validation');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/submit',
  auth('student'),
  grantAccess('create:own', resources.PROJECT),
  upload.single('file'),
  submitProject
);

router.get(
  '/all',
  auth('admin'),
  grantAccess('read:any', resources.PROJECT),
  getAllProjects
);

router.post(
  '/reviews/submit/:projectId',
  auth('admin'),
  grantAccess('create:any', resources.REVIEW),
  validate(reviewValidation.submitReview),
  submitReview
);

module.exports = router;
