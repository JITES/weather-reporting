# Weather reporting service

## About the API
A service that exposes an API implementing city details and weather details from openweathermap.org.

## Installation
- Make sure docker is running
- Go to the root directory and run the application using docker
```
docker-compose up
```
- Migrate data - run bash script to import the data ```sh ./setup/script/import.data.sh```
- Update the data and create geoSpatial index

```
use Klarna

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

db.cities.createIndex({
    loc : "2dsphere"
});
```

### Test
- Run ``` npm test ``` to execute test

### Execute a sample request
If developer is using VSCODE with REST client plugin, we can use http/cities.http file to make sample request.

### Assumptions
- User will a valid city id to get the city detail and weather to get the response
- User will enter a valid lat lng value to get near by cities within 10 km to get valid response

### About project
- Express, Mongo

### Feedback
Please feel free to share feedback jitesh.srivastava@gmail.com
