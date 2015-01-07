/** @jsx React.DOM */

var React = require('react');
var moment = require('moment-timezone');

module.exports = React.createClass({
  render: function() {
    var person = this.props.model;
    return <div className="person" key={person.name}>
      <img src={person.avatar} className="avatar"/>
      <div className="person-info">
        <p className="person-name">{person.name}</p>
        <p className="person-city">{person.city}</p>
      </div>
    </div>;
  }
});
