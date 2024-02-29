import mongoose from "mongoose";

//set rules

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // category: String,
  // expiryDate: Date,
  // freeShipping: Boolean,
  // brand: String,
  // quality: Number,
});

//create table
const Product = mongoose.model("Product", productSchema);

export default Product;
