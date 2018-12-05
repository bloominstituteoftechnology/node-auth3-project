#steps
install yarn
npm init -y (package.json)
yarn add express knex sqlite3
yarn add nodemon -D
knex init
  -remove staging and production (not needed here)
  -add useNullAsDefault: true, to development object
  -add migrations object, set directory to file location
    -set tableName if desired
  -add seeds if necessary, set directory to file location
create migration(s)/schema
  -knex migrate:make filename
  -open migration file and add knex schema




