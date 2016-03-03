var moment = require('moment-timezone');
var tzwhere = require('tzwhere');
tzwhere.init();


function appendTime(time, person) {
  if (!person.tz && (person.lat && person.lng)) {
    person.tz =  tzwhere.tzNameAt( person.lat, person.lng );
  }
  person.time = moment( time ).tz( person.tz );
}

function sortByTimezone(a, b){
  return a.time.utcOffset() - b.time.utcOffset();
}


module.exports = function transform(time, people) {

  // Append a moment date to each person
  people.forEach(appendTime.bind(people, time));
  people.sort(sortByTimezone);

  var timezones = people.reduce(function(zones, person){
    var last = zones[ zones.length - 1 ];
    var offset = last && last.people[0].time.utcOffset();

    if (last && offset === person.time.utcOffset()) {
      last.people.push(person);
    } else {
      zones.push({
        tz: person.tz,
        people: [ person ]
      });
    }

    return zones;
  }, []);

  timezones.forEach(function(timezone){
    if (timezone.people.length / people.length > 0.2)
      timezone.major = true;
  });

  return timezones;

};
