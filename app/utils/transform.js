var moment = require('moment-timezone');


function appendTime(time, person) {
  person.time = moment( time ).tz( person.tz );
}

function sortByTimezone(a, b){
  return a.time.zone() - b.time.zone();
}


module.exports = function transform(time, people) {

  // Append a moment date to each person
  people.forEach(appendTime.bind(people, time));
  people.sort(sortByTimezone);

  // Organize into timezones
  var timezones = {};

  people.forEach(function(person){
    var offset = person.time.zone();
    if ( !timezones[ offset ] ) timezones[ offset ] = [];
    timezones[ offset ].push( person );
  });

  return timezones;

};