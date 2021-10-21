import express from 'express';
const app = express();

import path from "path"
import logger from "morgan"
import cors from "cors"

const {pathname: root} = new URL('../frontend/build', import.meta.url)
const {pathname: root2} = new URL('../frontend/build/index.js', import.meta.url)
console.log(root)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send("test");
});

app.use(express.static(root));

app.get("*", function (_, res) {
  res.sendFile(
    root2,
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

export default app;