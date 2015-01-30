/** @jsx React.DOM */

var React    = require('react');
var Timezone = require('./timezone.jsx');

module.exports = React.createClass({
  render: function() {
    return <div className="timezone-list">
      {this.props.timezones.map(function(timezone){
        return <Timezone key={timezone.tz}
                         time={this.props.time}
                         timeFormat={this.props.timeFormat}
                         model={timezone} />;
      }.bind(this))}
    </div>;
  }
});