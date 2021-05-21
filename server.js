const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/any",
      name: "Justin",
      email: "j@gmail.com",
      phone: "111-111-1111",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/any",
      name: "Soon",
      email: "s@gmail.com",
      phone: "222-222-2222",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/any",
      name: "Kwon",
      email: "k@gmail.com",
      phone: "333-333-3333",
    },
    {
      id: 4,
      image: "https://placeimg.com/64/64/any",
      name: "Hwang",
      email: "h@gmail.com",
      phone: "444-444-4444",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
