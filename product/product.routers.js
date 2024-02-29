import express from "express";

import Product from "./product.model.js";
// import mongoose from "mongoose";

const router = express.Router();

router.post("/product/add", async (req, res) => {
  //extract new product from req.body
  const newProduct = req.body;

  //to add new product
  await Product.create(newProduct);

  //send respponse
  return res.status(200).send({ message: "product is added successfully." });
});

//to get the product list

router.get("/product/list", async (req, res) => {
  const productList = await Product.find();
  return res.status(200).send({ message: "success", Product: productList });
});

//to get product details by name

router.get("/product/details/:id", async (req, res) => {
  // extract course id from req.params

  const productId = req.params.id;

  //validate for mongo id
  const isvalidMongoId = mongoose.isValidObjectId(productId);

  //if not valide id
  if (!isvalidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  // find course by id

  const requiredProduct = await Product.findOne({ _id: productId });

  // if not course,throw error

  if (!requiredProduct) {
    return res.status(200).send({ message: "product does not exist." });
  }

  // send res
  return res
    .status(200)
    .send({ message: "success", productDetails: requiredProduct });
});

//delete by id

router.delete("/product/delete/:id", async (req, res) => {
  // extract course id from req.params
  const productId = req.params.id;
  // check for mongo id validity

  const isvalidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error

  if (!isvalidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  // find course by id
  const requiredProduct = await Product.findOne({ _id: productId });
  // if not course, throw error
  if (!requiredProduct) {
    return res.status(400).send({ message: "Product does not exist." });
  }
  // delete course
  await Product.deleteOne({ _id: productId });
  // send response

  return res.status(200).send({ message: "Product is deleted successfully." });
});

//product edited

router.put("/product/edit/:id", async (req, res) => {
  // extract courseId from req.params

  const productId = req.params.id;

  // check for mongo id validity
  const isvalidMongoId = mongoose.isValidObjectId(productId);

  // if not valid, throw error
  if (!isvalidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  // find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product dose not exist." });
  }

  // get new values from req.body
  const newValues = req.body;

  // edit product

  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        name: newValues.name,
        price: newValues.price,
      },
    }
  );

  // send response
  return res.status(200).send({ message: "Poduct is editing successfully." });
});

export default router;
