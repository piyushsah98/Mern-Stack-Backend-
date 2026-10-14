const express = require("express");

const app = express();
app.use(express.json());    

let users = [];

app.get("/", (req, res) => {
  res.send("server chal gaya");
});

// Read
app.get("/getUsers", (req, res) => {
  res.send(users);
});

// Create
app.post("/create", (req, res) => {
  let { id, name, age, sex } = req.body;

  let newUser = {
    id,
    name,
    age,
    sex,
  };

  users.push(newUser);

  res.send(newUser);
});

// Update
app.put("/update/:id", (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

  let updatedUser = users.map((val) =>
    val.id === id ? { ...val, name } : val,
  );

  res.send('user updated');
});

// Delete
app.delete('/delete/:id', (req, res) => {
    let {id} = req.params;

    let usersData = users.filter((val) => val.id !== id);
    users = usersData;

    res.send('user deleted');
})

const port = 2406;
app.listen(port, () => {
  console.log(`Server port ${port} pe chal rha hai`);
});
