#! /bin/sh

npm run migration:run
npm run seed:admin

exec "$@"