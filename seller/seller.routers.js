import express from "express";

import Seller from "./seller.model.js";
import mongoose from "mongoose";

const router = express.Router();

//to add seller

router.post("/seller/add", async (req, res) => {
  //extract new product from req.body

  const newSeller = req.body;

  //find user with new email

  const user = await Seller.findOne({ email: newSeller.email });

  //if user , throw error
  if (user) {
    return res.status(409).send({ message: "Email already exist." });
  }

  //to add new product
  await Seller.create(newSeller);
  //send respponse
  return res.status(200).send({ Message: "Seller is added successfully." });
});

//get seller list

router.get("/seller/list", async (req, res) => {
  // const sellerList = await Seller.find();

  //extract pagination data from req.body
  const { page, limit } = req.body;
  //calculate skip
  const skip = (page - 1) * limit;

  const sellerList = await Seller.aggregate([
    { $match: {} },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  return res.status(200).send({ message: "success", Seller: sellerList });
});

//get seller by id

router.get("/seller/details/:id", async (req, res) => {
  // extract course id from req.params
  const sellerId = req.params.id;
  //validate for mongo id
  const isvalidMongoId = mongoose.isValidObjectId(sellerId);

  //if not valide id
  if (!isvalidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  // find course by id
  const requiredSeller = await Seller.findOne({ _id: sellerId });

  // if not course,throw error
  if (!requiredSeller) {
    return res.status(400).send({ message: "Seller does not exist" });
  }

  // send res
  return res
    .status(200)
    .send({ message: "success", sellerDetail: requiredSeller });
});

export default router;
