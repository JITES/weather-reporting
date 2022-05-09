
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