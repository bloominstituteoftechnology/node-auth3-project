#steps
install yarn
npm init -y (package.json)
yarn add express knex sqlite3 cors
yarn add nodemon -D
yarn add bcryptjs
yarn add jsonwebtoken
yarn add dotenv

knex init
  -remove staging and production (not needed here)
  -add useNullAsDefault: true, to development object
  -add migrations object, set directory to file location
    -set tableName if desired
  -add seeds if necessary, set directory to file location
  -change connection filename to where you would like sqlite3 file to be located
create migration(s)/schema
  -knex migrate:make filename
  -open migration file and add knex schema
  -when finished with scheme run knex migrate:latest
    (this should create a sqlite3 file)

create index.js file
  -add require(s) and routes/middleware

#CONNECTING TO FRONT END
steps to connect a font end react app to a server.
add dependency on server json file
```yarn add cors```
on server.js file, require cors.
```const cors = require('cors');```
use as middleware
```server.use(cors());```
or for more specific/secure connection to a react front end running on port 3000
```server.use(cors({ origin: 'http://localhost:3000'}));```


On react app add axios as dependency
```yarn add axios```
import axios
```import axios from 'axios';```


get the data...maybe like this

```componentWillMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('http://localhost:5000/posts')
      .then((response) => {
        //console.log('response', response.data.posts);
        this.setState({posts: response.data.posts})
      })
      .catch(err => console.log(err));
  }```





