// const express = require("express")
// const app = express()



// const {MongoClient }= require("mongodb")


// app.use(express.json())
// const url = "mongodb+srv://admin:admin123@cluster0.xvkeaih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // change if using Atlas
// const client = new MongoClient(url);
// const dbName = "testdb"; // your DB name

// let db, collection;

// // main function for connection to database

// async function main() {
//      await client.connect();
//   console.log(" Connected to MongoDB");
//   db = client.db(dbName);
//   collection = db.collection("products");
// }
// main().catch(console.error);



// // CREATE - Add new product
// app.post("/products", async (req, res) => {
//   try {
//     const result = await collection.insertOne(req.body);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // READ - Get all products
// app.get("/products", async (req, res) => {
//   try {
//     const products = await collection.find({}).toArray();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // READ - Get product by ID
// app.get("/products/:id", async (req, res) => {
//   try {
//     const product = await collection.findOne({ _id: new ObjectId(req.params.id) });
//     if (!product) return res.status(404).json({ error: "Not Found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UPDATE - Update product by ID
// app.put("/products/:id", async (req, res) => {
//   try {
//     const result = await collection.updateOne(
//       { _id: new ObjectId(req.params.id) },
//       { $set: req.body }
//     );
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE - Delete product by ID
// app.delete("/products/:id", async (req, res) => {
//   try {
//     const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// app.listen(3000,()=>{
//     console.log("port listening on port 3000")
// })





const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

// ✅ Use correct Atlas URI (from your dashboard, Node.js driver option)
const url = "mongodb+srv://admin:admin123@cluster0.xvkeaih.mongodb.net/testdb?retryWrites=true&w=majority";

// ✅ TLS fix
const client = new MongoClient(url, {
  tls: true,
  tlsAllowInvalidCertificates: true,
});

let db, collection;

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    db = client.db("testdb");
    collection = db.collection("products");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}
main();

// ------------------ CRUD ------------------
app.post("/products", async (req, res) => {
  try {
    const result = await collection.insertOne(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await collection.find({}).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: "Not Found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
