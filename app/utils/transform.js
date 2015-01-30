var moment = require('moment-timezone');


function appendTime(time, person) {
  person.time = moment( time ).tz( person.tz );
}

function sortByTimezone(a, b){
  return b.time.zone() - a.time.zone();
}


module.exports = function transform(time, people) {

  // Append a moment date to each person
  people.forEach(appendTime.bind(people, time));
  people.sort(sortByTimezone);

  var timezones = people.reduce(function(zones, person){
    var last = zones[ zones.length - 1 ];
    var offset = last && last.people[0].time.zone();

    if (last && offset === person.time.zone()) {
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

  // // Organize into timezones
  // var timezones = {};

  // people.forEach(function(person){
  //   var offset = person.time.zone();
  //   if ( !timezones[ offset ] ) timezones[ offset ] = [];
  //   timezones[ offset ].push( person );
  // });

  // for (var offset in timezones) {
  //   if (timezones[offset].length / people.length > 20)
  //     timezones[offset]
  // }

  return timezones;

};