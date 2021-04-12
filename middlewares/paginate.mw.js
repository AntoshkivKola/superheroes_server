module.exports = c => async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;
    req.pagination = {
      limit: !limit || limit > c || limit <= 0 ? c : limit,
      offset: !offset || offset <= 0 ? 0 : offset,
    };
    next();
  } catch (err) {
    next(err);
  }
};
