export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        sucssess: false,
        message: error.details.map((detail) => error),
      });
    }
    req.validated = value;
    next();
  };
};

export default validate;
