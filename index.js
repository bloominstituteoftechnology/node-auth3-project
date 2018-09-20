 });
        } else {
          res.status(401).json({ message: 'incorrect login' });
        }
    })
    .catch(err => res.status(500).json(err))
  });
 
  server.get('/api/users', protected, (req, res) => {
    db('users')
    .select('id', 'username','password')
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err));
  })
const port = 6600;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
