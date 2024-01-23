const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.Db_User}:${process.env.Db_pass}@cluster0.7bfhsu6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    client.connect();

    const movies = client.db("movisData").collection("movies");
    const comment = client.db("movisData").collection("comment");

    app.get("/all-movie", async (req, res) => {
      const result = await movies.find().toArray();
      res.send(result);
    });
    app.get("/all-comment", async (req, res) => {
      const result = await comment.find().toArray();
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Test file running");
});

app.listen(port, () => {
  console.log(`Test file is running on port ${port}`);
});
