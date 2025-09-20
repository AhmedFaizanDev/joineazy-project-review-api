const { Review, Project } = require('../db/models');

const submitReview = async ({ projectId, adminId, comments }) => {
  const review = await Review.create({
    project_id: projectId,
    admin_id: adminId,
    comments,
  });

  await Project.update(
    { status: 'reviewed' },
    { where: { id: projectId } }
  );

  console.info(
    `Simulated email sent to student for Project [${projectId}] on review completion.`
  );

  return review;
};

module.exports = {
  submitReview,
};
