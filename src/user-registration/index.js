const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234567",
  database: "test"
});
const PORT = 3000;


// Middleware
app.use(cors())
app.use(bodyParser.json());


// Registration Endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = password;
  
      db.connect((err) => {
        if (err) {
            return console.error('Error connecting to MySQL:', err.message);
        }
        console.log('Connected to MySQL database');
      });
      // Insert into the database
      db.query(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPassword],
        (err) => { 
          if (err) {
            if (err.message.includes('ER_DUP_ENTRY')) {
              if(err.message.includes('username')){
                return res.status(400).json({ error: 'Username already exists' });
              }else{
                return res.status(400).json({ error: 'Email already exists' });
              }

            }
            return res.status(500).json({ error: 'Database error' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  });

  app.listen(PORT);