import express from "express";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routers.js";
import sellerRoutes from "./seller/seller.routers.js";

//export gare ko neme lai  change garna milxa route to productRoutes
const app = express();

//to make understand json

app.use(express.json());
//===================================database connection==========================================
connectDB();
//=====================================register routes=====================================
app.use(productRoutes);
app.use(sellerRoutes);
//========================================port and server=================================
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
