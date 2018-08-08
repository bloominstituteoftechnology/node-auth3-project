const codes = require("./data/statusCodes");

const express = require("express");
const server = express();

const userRoutes = require("./api/userRouter");

const secret = 'we have the power!';
function generateToken(user) {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '12h',
    jwtid: '482910',
  }

  return jwt.sign(payload, secret, options);
}
function protect(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'you shall not pass!! - token invalid' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'you shall not pass!! - no token' });
  }
}

server.use(express.json());


server.post('/api/register', function(req, res) {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db('users')
    .insert(user)
    .then(id => {
      db('users')
        .where({ id: id[0] })
        .first()
        .then(user => {
          const token = generateToken(user);

          res.status(codes.CREATED).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});


      })
      .catch(err => {
        next(err);
      });
  });
  

server.use((err, req, res, next) => {
  err.code = err.code !== undefined ? err.code : codes.INTERNAL_SERVER_ERROR;
  const errorInfo = {
    status: err.code,
    errorMessage: err.message,
    success: false,
    route: err.route
  };
  switch (errorInfo.code) {
    case codes.BAD_REQUEST:
      res.status(codes.BAD_REQUEST).json(errorInfo);
      return;
    case codes.NOT_FOUND:
      res.status(codes.NOT_FOUND).json(errorInfo);
      return;
    default:
      res.status(codes.INTERNAL_SERVER_ERROR).json(errorInfo);
  }
});
const port = 8001;
server.listen(port, (req, res) => console.log(`Port ${port} is in use`));
