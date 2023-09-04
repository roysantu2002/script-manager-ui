// pages/api/login.js
import jwt from "jsonwebtoken";
import usersData from "../../src/data/users.json";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Find the user in the JSON data
    const user = usersData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Create a JWT token with user information
      const token = jwt.sign(user, "your-secret-key", {
        expiresIn: "1h", // Token expires in 1 hour
      });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
