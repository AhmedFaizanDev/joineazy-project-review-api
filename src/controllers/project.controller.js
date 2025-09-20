const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const createProject = catchAsync(async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(httpStatus.CREATED).send({ project });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

const getProjectsByStudent = catchAsync(async (req, res) => {
  try {
    const projects = await projectService.getProjectsByStudent(req.params.studentId);
    res.status(httpStatus.OK).send({ projects });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ error: error.message });
  }
});

const getAllProjects = catchAsync(async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(httpStatus.OK).send({ projects });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({ error: error.message });
  }
});

const leaveReview = catchAsync(async (req, res) => {
  try {
    const review = await projectService.leaveReview(
      req.params.projectId,
      req.user.id,
      req.body.comment
    );
    res.status(httpStatus.OK).send({ review });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

const submitProject = catchAsync(async (req, res) => {
  const { title, summary } = req.body;
  const { file } = req;
  const studentId = req.user.id;

  const project = await projectService.submitProject({
    title,
    summary,
    fileName: file.originalname,
    filePath: file.path,
    studentId,
  });

  res.status(httpStatus.CREATED).send({ project });
});

module.exports = {
  createProject,
  getProjectsByStudent,
  getAllProjects,
  leaveReview,
  submitProject,
};
