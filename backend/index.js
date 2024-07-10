const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const port =  5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
const CONNECTION_STRING = "mongodb+srv://praveen6911:Praveen%40123@cluster0.uab6aor.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Import User model
const User = require("./models/users"); 
const Seller = require("./models/sellers");
const Product = require('./models/products');
const Cart = require('./models/carts'); // Import Cart model




app.get("/usersignup", (req, res) => {
  res.render("usersignup");
});

app.post("/create-user", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const newuser = new User({ username, email, password });
    await newuser.save();
    res.redirect("/users");
  } catch (err) {
    console.error("Failed to create user:", err.message);
    res.status(500).send({ error: "Failed to create user", details: err.message });
  }
});
app.post("/google-login", async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, username: name, password: "" });
      await user.save();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to process Google login", details: error.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users", details: error });
  }
});

app.put("/update-User/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email,  password },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "Seller not found" });
    }

    res.status(200).send(user); // Optionally, you can send back the updated seller data
  } catch (error) {
    console.error('Error updating seller:', error);
    res.status(500).send({ error: "Failed to update seller", details: error.message });
  }
});


app.get("/sellersignup", (req, res) => {
  res.render("sellersignup");
});

app.post("/create-seller", async (req, res) => {
  try {
    const { username, email, restaurant, address, phone, image, description, password, costForTwo, rating, cuisines } = req.body;

    // Validate request body
    if (!username || !email || !restaurant || !address || !phone || !image || !description || !password || !costForTwo || !rating || !cuisines) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const newSeller = new Seller({ username, email, password, restaurant, address, phone, image, description, costForTwo, rating, cuisines });
    await newSeller.save();
    res.redirect("/sellers");
  } catch (err) {
    console.error("Failed to create seller:", err.message);
    res.status(500).send({ error: "Failed to create seller", details: err.message });
  }
});


app.get("/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.status(200).send(sellers);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch sellers", details: error });
  }
});

app.get("/sellers/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).send({ error: "Seller not found" });
    }
    res.send (seller);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch seller", details: error });
  }
});
app.get("/updateSeller/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).send({ error: "Seller not found" });
    }
    res.render("updateSeller", { seller });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch seller", details: error });
  }
});

app.put("/update-Seller/:id", async (req, res) => {
  try {
    const { username, email, restaurant, address, phone, image, description, password, costForTwo, rating, cuisines } = req.body;

    // Validate request body
    if (!username || !email || !restaurant || !address || !phone || !image || !description || !password || !costForTwo || !rating || !cuisines) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const seller = await Seller.findByIdAndUpdate(
      req.params.id,
      { username, email, restaurant, address, phone, image, description, password, costForTwo, rating, cuisines },
      { new: true }
    );

    if (!seller) {
      return res.status(404).send({ error: "Seller not found" });
    }

    res.status(200).send(seller); // Optionally, you can send back the updated seller data
  } catch (error) {
    console.error('Error updating seller:', error);
    res.status(500).send({ error: "Failed to update seller", details: error.message });
  }
});



app.put("/updateSeller/:id", async (req, res) => {
  try {
    const { username, email, restaurant, address, phone, image, description, password } = req.body;

    // Validate request body
    if (!username || !email || !restaurant || !address || !phone || !image || !description || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const seller = await Seller.findByIdAndUpdate(
      req.params.id,
      { username, email, restaurant, address, phone, image, description, password },
      { new: true }
    );

    if (!seller) {
      return res.status(404).send({ error: "Seller not found" });
    }

    res.redirect("/sellers");
  } catch (error) {
    res.status(500).send({ error: "Failed to update seller", details: error });
  }
});
app.post("/google-login", async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, username: name, password: "" });
      await user.save();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to process Google login", details: error.message });
  }
});

app.get('/addProduct',async (req, res) => {
  res.render('addProduct');
});


app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch sellers", details: error });
  }
});
app.get("/products/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    console.log("sellerId", sellerId);

    // Ensure sellerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).send({ error: "Invalid seller ID" });
    }

    const products = await Product.find({ sellerId });

    if (!products.length) {
      return res.status(404).send({ error: "No products found for this seller" });
    }

    res.status(200).send(products);
  } catch (error) {
    console.error("Failed to fetch products for seller:", error.message);
    res.status(500).send({ error: "Failed to fetch products", details: error.message });
  }
});




app.post('/addProduct', async (req, res) => {
  try {
    const { name, description, price,image, sellerId } = req.body;
    
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      sellerId,
    });

    await newProduct.save();
    res.redirect('/products');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/add-to-cart', async (req, res) => {
  try {
    const { productId,name, description, price, image, sellerId, userId } = req.body;
    
    const newCartItem = new Cart({
      productId,
      name,
      description,
      price,
      image,
      quantity: 1,
      sellerId,
      userId,
    });

    await newCartItem.save();
    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Failed to add item to cart:", error.message);
    res.status(500).json({ error: "Failed to add item to cart", details: error.message });
  }
});

app.get("/carts", async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch sellers", details: error });
  }
});

app.put("/cart/increase-quantity/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const updatedItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    res.status(200).send(updatedItem);
  } catch (error) {
    console.error("Failed to increase item quantity:", error.message);
    res.status(500).send({ error: "Failed to increase item quantity", details: error.message });
  }
});

app.put("/cart/decrease-quantity/:id", async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const updatedItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    res.status(200).send(updatedItem);
  } catch (error) {
    console.error("Failed to decrease item quantity:", error.message);
    res.status(500).send({ error: "Failed to decrease item quantity", details: error.message });
  }
});




// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
