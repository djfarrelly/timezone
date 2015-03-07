/** @jsx React.DOM */

var React = require('react');
var moment = require('moment-timezone');

module.exports = React.createClass({
  getNameInitials: function() {
    return this.props.model.name.replace(/[^A-Z]/g, '');
  },

  getSafeAvatarSource: function() {
    person = this.props.model;

    return person.avatar ? person.avatar : "http://placehold.it/60&text=" + this.getNameInitials();
  },

  render: function() {
    var person = this.props.model;
    return <div className="person" key={person.name}>
      <img src={this.getSafeAvatarSource()} className="avatar"/>
      <div className="person-info">
        <p className="person-name">{person.name}</p>
        <p className="person-city">{person.city}</p>
      </div>
    </div>;
  }
});
