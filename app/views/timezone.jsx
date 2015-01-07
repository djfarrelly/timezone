/** @jsx React.DOM */

var React = require('react');
var moment = require('moment-timezone');
var Person = require('./person.jsx');

module.exports = React.createClass({
  render: function() {

    // We clone the time object itself so the this time is bound to
    // the global app time

    var localTime   = moment( this.props.time ).zone( parseInt( this.props.offset, 10) ),
        displayTime = localTime.format( this.props.timeFormat ),
        offset      = localTime.format('Z');

    this.props.model.sort(function(a, b){
      return a.name > b.name ? 1 : -1;
    });

    var timezoneClasses = 'timezone timezone-hour-' + localTime.hour();

    return <div className={timezoneClasses}>
      <h3 className="timezone-time">{displayTime}</h3>
      <p className="timezone-offset">{offset}</p>
      {this.props.model.map(function(person){
        return <Person model={person} />;
      })}
    </div>;
  }
});
