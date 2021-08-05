const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const { createReview, deleteReview } = require("../controllers/reviews");
const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = router;
