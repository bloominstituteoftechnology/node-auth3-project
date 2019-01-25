require('dotenv').config();
const express = require("express");
// const helmet = require("helmet");
// const KnexSessionStore = require("connect-session-store")(session);
const bcrypt = require("bcryptjs");
const dbFuncs = require("./dbFunctions");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const protectedRoutes = require("./protectedRoutes")
const cors = require("cors")

const server = express();

// server.use(helmet());
server.use(express.json());
server.use(morgan("short"))
server.use(cors())

//middleware callback for organization. Import file that has middleware

function protected(req,res,next){
    const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'invalid token' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'no token provided' });
	}
}

function generateToken(user) {
	const payload = {
		username: user.username,
		name: user.name
	};

	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '2m',
	};

	return jwt.sign(payload, secret, options);
}

server.get("/", (req, res) => {
  res.status(200).send("<h1>The server is up</h1>");
});

server.post("/register", async (req, res) => {
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 12);
  userInfo.password = hash;

  try {
    const response = await dbFuncs.addUser(userInfo);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

server.post("/login", async (req, res) => {
    console.log(req.body)
  const creds = req.body;
  try {
    const user = await dbFuncs.getUser(creds);
    if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.name}`,token });
    } else {
      res
        .status(401)
        .json({ message: `Username and/or password are incorrect` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error`, error: err });
  }
});

server.use("/user" , protected, protectedRoutes)

// server.get("/logout",(req,res) => {
//     if(req.session.user){
//         req.session.destroy(err => {
//             if(err){
//                 res.status(500).send("<h1>Error with logout request</h1>")
//             } else {
//                 res.status(500).send("<h1>You have successfully logged out</h1>")
//             }
//         })
//     } else {
//         res.send("<h1>You are already logged out</h1>")
//     }
// })

const port = process.env.PORT || 3300;

server.listen(port, () =>
  console.log(`The server is listening on port ${port}`)
);
