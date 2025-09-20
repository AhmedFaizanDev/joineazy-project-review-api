const { Project, Review, User } = require('../db/models');

async function createProject(req) {
  const { title, summary } = req.body;
  const filePath = req.file ? req.file.path : null;
  const project = await Project.create({
    title,
    summary,
    filePath,
    userId: req.user.id,
  });
  return project;
}

async function getProjectById(projectId) {
  return await Project.findByPk(projectId);
}

async function getAllProjects() {
  try {
    const projects = await Project.findAll({
      include: [
        { model: User, as: 'student', attributes: ['name', 'email'] },
      ],
    });
    if (projects.length === 0) {
      throw new Error('No projects found');
    }
    return projects;
  } catch (error) {
    throw new Error('Error fetching all projects: ' + error.message);
  }
}

async function reviewProject(projectId, reviewData) {
  const project = await Project.findByPk(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  project.reviewComments = reviewData.comments;
  project.status = reviewData.status;
  await project.save();
  return project;
}

async function getProjectsByStudent(studentId) {
  try {
    const projects = await Project.findAll({
      where: { student_id: studentId },
      include: [{ model: User, as: 'student', attributes: ['name', 'email'] }],
    });
    return projects;
  } catch (error) {
    throw new Error('Error fetching projects for student: ' + error.message);
  }
}

async function leaveReview(projectId, adminId, comment) {
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const review = await Review.create({
      project_id: projectId,
      admin_id: adminId,
      comments: comment,
      status: 'pending',
    });
    return review;
  } catch (error) {
    throw new Error('Error leaving review: ' + error.message);
  }
}

async function submitProject({ title, summary, fileName, filePath, studentId }) {
  const project = await Project.create({
    title,
    summary,
    file_name: fileName,
    file_path: filePath,
    student_id: studentId,
  });
  return project;
}

module.exports = {
  createProject,
  getProjectById,
  getAllProjects,
  reviewProject,
  getProjectsByStudent,
  leaveReview,
  submitProject,
};
