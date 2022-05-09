# Weather reporting service

## About the API
A service that exposes an API implementing city details and weather details from openweathermap.org.

## Installation
Step 1
    Add env file and add following values ```.env.development.local```
    
    ```
    #PORT
    PORT = 3000

    #DATABASE
    DB_HOST = mongo
    DB_PORT = 27017
    DB_DATABASE = Klarna

    #OPENWEATHER API 
    API_KEY=cb256bb77b78d40748970f8bc6a5ed8d
    OPEN_WEATHER_API=https://api.openweathermap.org/data/2.5/weather

    #RANGE for near by cities in KM
    RANGE_KM=10
    ```
Step 2 
    - Make sure docker is running
    - Go to the root directory and run the application using docker
    ```
    docker-compose up
    ```
Step 3 - Data Migration

    - To migrate the data, mongoimport is being used if that is not install then please install it using ``` brew install mongodb/brew/mongodb-database-tools ```
    - Migrate data - run bash script to import the data ```sh ./setup/script/import.data.sh```
    - Update the data and create geoSpatial index using following script

    ```
    // switch to db
    use Klarna

    // the following command takes time so please wait it completes

    db.cities.find().forEach(function (city) {
        var point = {
            _id : city._id,
            id:city.id,
            name:city.name,
            state:city.state,
            country:city.country,
            loc : {
                type : "Point",
                coordinates : [city.coord.lon, city.coord.lat]
            }
        };
        db.cities.update(city, point);
    });

    // create the index

    db.cities.createIndex({
        loc : "2dsphere"
    });
    ```
### Test
- Run ``` npm test ``` to execute test

### Execute a sample request
If developer is using VSCODE with REST client plugin, we can use http/cities.http file to make sample request.

Endpoint using insomnia 

- Make GET request - City details - http://localhost:3000/cities/2873891
- Make GET request - City weather - http://localhost:3000/cities/2873891/weather
- Make GET request - Near by Cities - http://localhost:3000/cities?lat=49.48&lng=8.46
### Assumptions
- User will enter a valid city id to get the city detail and weather to get the response
- User will enter a valid lat lng value to get near by cities within 10 km to get valid response

### About project
- Express, Mongo, NodeJS, Docker

### Feedback
Please feel free to share feedback jitesh.srivastava@gmail.com
