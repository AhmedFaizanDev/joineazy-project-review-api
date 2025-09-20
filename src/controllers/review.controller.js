const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');

const submitReview = catchAsync(async (req, res) => {
  const { comments } = req.body;
  const { projectId } = req.params;
  const adminId = req.user.id;

  const review = await reviewService.submitReview({
    projectId,
    adminId,
    comments,
  });

  res.status(httpStatus.CREATED).send({ review });
});

module.exports = {
  submitReview,
};
