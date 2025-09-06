export const productValidator = async (req, res, next) => {
  const { name, category, price, offerPrice, existingImagesData } = req.body;
  const description = JSON.parse(req.body.description);
  try {
    if (!name) {
      return res.json({ success: false, message: "Please provide the name" });
    }
    if (description.some((item) => item === "")) {
      return res.json({
        success: false,
        message: "Please dont provide empty line in description",
      });
    }
    if (!category) {
      return res.json({
        success: false,
        message: "Please provide the category",
      });
    }
    if (!price) {
      return res.json({ success: false, message: "Please provide the price" });
    }
    if (!offerPrice) {
      return res.json({
        success: false,
        message: "Please provide the Offer Price",
      });
    }
    if (req.files.length === 0) {
      if (!existingImagesData) {
        return res.json({
          success: false,
          message: "Please provide an Image",
        });
      }
    }
    req.body = {
      ...req.body,
      description,
    };
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
