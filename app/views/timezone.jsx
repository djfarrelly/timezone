/** @jsx React.DOM */

var React = require('react');
var moment = require('moment-timezone');
var Person = require('./person.jsx');

var PEOPLE_PER_COL = 7;

module.exports = React.createClass({

  getCountsOf: function(list, param) {
    return list
      .map(function(el) {
        return el[param];
      })
      .sort()
      .reduce(function(counts, el) {
        if (!counts[el])
          counts[el] = 1;
        else
          counts[el]++;
        return counts;
      }, {});
  },

  getHighestOccuring: function(counts) {
    var keys = Object.keys(counts);
    return keys.reduce(function(prev, curr){
      return counts[curr] > counts[prev] ? curr : prev;
    }, keys[0]);
  },

  getTopTimezone: function() {

    var tzCounts = this.getCountsOf(this.props.model.people, 'tz');
    var topTz = this.getHighestOccuring(tzCounts);
    
    return topTz.replace(/.+\//g, '').replace(/_/g,' ');
  },

  getTopCity: function() {

    var cityCounts = this.getCountsOf(this.props.model.people, 'city');
    var topCity = this.getHighestOccuring(cityCounts);

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
