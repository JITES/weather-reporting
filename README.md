# Weather reporting service

## About the API
A service that exposes an API implementing city details and weather details from openweathermap.org.

## Installation

- Spin up the docker
```
docker-compose up
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
