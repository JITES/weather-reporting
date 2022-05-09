#!/usr/bin/env bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

echo "$parent_path"
# brew install mongodb/brew/mongodb-database-tools
mongoimport --uri="mongodb://localhost:27017/Klarna" --collection cities --file $( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )/city.list.json --jsonArray