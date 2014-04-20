var React = require('react');
var moment = require('moment-timezone');

module.exports = React.createClass({
  render: function() {
    var localTime = this.props.time.tz( this.props.model.tz );
    var displayTime = localTime.format('h:mm a');
    var offset = localTime.format('Z');
    return <div>
      <h3>{this.props.model.city}</h3>
      <p>{displayTime}</p>
      <p>GMT {offset}</p>
    </div>;
  }
});