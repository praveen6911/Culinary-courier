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
const User = require("./models/users"); // Adjust path as needed
const Seller = require("./models/sellers");

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
    const { username, email, restaurant, address, phone, image, description, password } = req.body;

    // Validate request body
    if (!username || !email || !restaurant || !address || !phone || !image || !description || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const newSeller = new Seller({ username, email, password, restaurant, address, phone, image, description });
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


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
