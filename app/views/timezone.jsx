/** @jsx React.DOM */

var React = require('react');
var moment = require('moment-timezone');
var Person = require('./person.jsx');

var PEOPLE_PER_COL = 7;

module.exports = React.createClass({

  getTopTimezone: function() {

    var tzCounts = this.props.model.people.reduce(function(counts, person) {
      if (!counts[person.tz])
        counts[person.tz] = 1;
      else
        counts[person.tz]++;
      return counts;
    }, {});

    var topTz = Object.keys(tzCounts)[0];
    for (var tz in tzCounts) {
      if (tzCounts[tz] > tzCounts[topTz])
        topTz = tz;
    }
    
    return topTz.replace(/.+\//g, '').replace(/_/g,' ');
  },

  getTopCity: function() {

    var cityCounts = this.props.model.people.reduce(function(counts, person) {
      if (!counts[person.city])
        counts[person.city] = 1;
      else
        counts[person.city]++;
      return counts;
    }, {});

    var topCity = Object.keys(cityCounts)[0];
    for (var city in cityCounts) {
      if (cityCounts[city] > cityCounts[topCity])
        topCity = city;
    }
    
    return cityCounts[topCity] === 1 && this.props.model.people.length > 1 ?
      this.getTopTimezone() :
      topCity;
  },

  getPeopleColumns: function() {
    
    this.props.model.people.sort(function(a, b){
      return a.name > b.name ? 1 : -1;
    });

    return this.props.model.people.reduce(function(cols, person){
      if (cols[cols.length - 1] && 
          cols[cols.length - 1].length  < PEOPLE_PER_COL)
        cols[cols.length - 1].push(person);
      else
        cols.push([ person ]);
      return cols;
    }, []);
  },

  render: function() {

    // We clone the time object itself so the this time is bound to
    // the global app time

    var localTime   = moment( this.props.time ).tz( this.props.model.tz ),
        displayTime = localTime.format( this.props.timeFormat ),
        offset      = localTime.format('Z');

    var timezoneClasses = 'timezone timezone-hour-' + localTime.hour();

    if (this.props.model.major) timezoneClasses += ' timezone-major';
    
    var topCity = this.getTopCity();
    var columns = this.getPeopleColumns();

    return <div className={timezoneClasses}>
      <div className="timezone-header">
        <h3 className="timezone-time">{displayTime}</h3>
        <p className="timezone-name">{topCity}</p>
        <p className="timezone-offset">{offset}</p>
      </div>
      <div className="timezone-people">
        {columns.map(function(column, idx){
          return <div className="timezone-people-column" key={"column-" + idx}>
            {column.map(function(person){
              // NOTE: Replace with future user id
              var key = person.avatar.substr(person.avatar.length - 20, 20);
              return <Person model={person} key={key} />;
            })}
          </div>
        })}
      </div>
    </div>;
  }
});
