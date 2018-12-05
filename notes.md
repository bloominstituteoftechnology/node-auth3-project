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




