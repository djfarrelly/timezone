/** @jsx React.DOM */

var React = require('react');
var moment = require('moment-timezone');
var Person = require('./person.jsx');

module.exports = React.createClass({
  render: function() {

    // We clone the time object itself so the this time is bound to
    // the global app time

    var localTime   = moment( this.props.time ).tz( this.props.model.tz ),
        displayTime = localTime.format( this.props.timeFormat ),
        offset      = localTime.format('Z');

    this.props.model.people.sort(function(a, b){
      return a.name > b.name ? 1 : -1;
    });

    var timezoneClasses = 'timezone timezone-hour-' + localTime.hour();

    if (this.props.model.major) timezoneClasses += ' timezone-major';

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
    
    var topCity = topTz.replace(/.+\//g, '').replace(/_/g,' ');

    return <div className={timezoneClasses}>
      <div className="timezone-header">
        <h3 className="timezone-time">{displayTime}</h3>
        <p className="timezone-name">{topCity}</p>
        <p className="timezone-offset">{offset}</p>
      </div>
      <div className="timezone-people">
        {this.props.model.people.map(function(person){
          var key = person.name + Math.floor(Math.random() * 10);
          return <Person model={person} key={key} />;
        })}
      </div>
    </div>;
  }
});
