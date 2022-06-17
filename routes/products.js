const express = require("express");
const Products = require("../modals/Products");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const midware = require("../middleware/midware");

//api endpoint for fetching all products

router.get("/fetchallproducts", midware, async (req, res) => {
  const product = await Products.find();
  res.json(product);
});

//api endpoint for fetching a product by id

router.get("/fetchproduct/:id", midware, async (req, res) => {
  const product = await Products.findById(req.params.id);
  res.json(product);
});

//api endpoint for creating a product

router.post(
  "/addproduct",
  midware,
  // express-validator checking for correct data from request
  [
    body("title", "Please enter a valid title").isLength({ min: 2 }),
    body("discription", "Please discribe product correctly").isLength({
      min: 5,
    }),
    body("price", "Please enter resonable price")
      .isNumeric()
      .isFloat({ min: 1 }),
    body("rating", "rating must be between 1-5")
      .isNumeric()
      .isFloat({ min: 1, max: 5 }),
  ],
  async (req, res) => {
    try {
      // destructuring request body
      const { title, discription, price, rating, image } = req.body;

      // validator is throw errors if there any
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // creating new product from request body
      const product = new Products({
        title,
        discription,
        price,
        rating,
        image
      });

      // saving the product
      const savedproduct = await product.save();
      if (savedproduct) {
        res.status(201).json({savedproduct:savedproduct,message:"Product Add Successfully"});
      } else {
        res.status(500).json({ error: "failed to add product" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

// api end point for updating a existing product

router.put("/updateproduct/:id", midware, async (req, res) => {
  try{
  const { title, discription, price, rating, image } = req.body;
  /* create a new empty product and checking for any updated parameter in request body and if found then put into new product */
  const newProduct = {};
  if (title) {
    newProduct.title = title;
  }
  if (discription) {
    newProduct.discription = discription;
  }
  if (price) {
    newProduct.price = price;
  }
  if (rating) {
    newProduct.rating = rating;
  }
  if (image) {
    newProduct.image = image;
  }

  //checking for product which to be updated
  let product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Product Not Found Not Found");
  }

  // updation of product
  product = await Products.findByIdAndUpdate(
    req.params.id,
    { $set: newProduct },
    { new: true }
  );
  res.json({ message: "Product is UPDATED Successfully", updatedproduct: product });}
  catch(err){
    // console.error(error.message);
      res.status(500).json({ error: err });
  }
});

//api endpoint for delete an existing product

router.delete("/deleteproduct/:id", midware, async (req, res) => {
  // checking for product which to be deleted
  let product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Not Found");
  }

  // deletion of product
  product = await Products.findByIdAndDelete(req.params.id);
  res.json({ message: "Product is DELETED Successfully", deletedproduct: product });
});

module.exports = router;
