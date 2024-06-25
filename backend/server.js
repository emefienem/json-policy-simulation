require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Policy = require("./models/Policy");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/get-policies", async (req, res) => {
  try {
    const policy = await Policy.findOne();
    if (!policy) {
      return res.status(404).send("Policy not found");
    }
    res.json(policy);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.put("/api/update-policies", async (req, res) => {
  const { body } = req;
  try {
    const updatedPolicy = await Policy.findOneAndUpdate({}, body, {
      new: true,
    });
    if (!updatedPolicy) {
      return res.status(404).send("Policy not found");
    }
    res.json(updatedPolicy);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.post("/api/initialize-policy", async (req, res) => {
  const defaultPolicy = {
    name: "Default Policy",
    rules: [
      { condition: "userIsAdmin", action: "allow" },
      { condition: "userIsGuest", action: "deny" },
    ],
  };

  try {
    const policy = new Policy(defaultPolicy);
    await policy.save();
    res.status(201).json(policy);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
