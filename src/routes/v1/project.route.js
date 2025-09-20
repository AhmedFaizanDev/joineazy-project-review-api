const express = require('express');
const validate = require('../../middlewares/validate');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const projectController = require('../../controllers/project.controller');
const projectValidation = require('../../validations/project.validation');
const multer = require('multer');
const jwt = require('../../config/jwt');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Student: Submit a project
router.post(
  '/',
  jwt(),
  grantAccess('create:own', 'project'),
  upload.single('file'),
  validate(projectValidation.createProject),
  projectController.createProject
);

// Student: View submission status
router.get(
  '/:projectId',
  grantAccess('read:own', 'project'),
  validate(projectValidation.getProject),
  projectController.getProject
);

// Student: View their projects
router.get(
  '/',
  jwt(),
  grantAccess('read:own', 'project'),
  projectController.getProjectsByStudent
);

// Admin: View all projects
router.get(
  '/admin/projects',
  jwt(),
  grantAccess('read:any', 'project'),
  projectController.getAllProjects
);

// Admin: Review a project
router.post(
  '/admin/projects/:projectId/review',
  jwt(),
  grantAccess('update:any', 'project'),
  validate(projectValidation.reviewProject),
  projectController.leaveReview
);

module.exports = router;
