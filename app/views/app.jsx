var React = require('react');
var TimeSelect = require('./timeSelect.jsx');
var TimezoneList = require('./timezoneList.jsx');

module.exports = React.createClass({
  render: function() {
    return <div className="container">
      <TimeSelect time={this.props.time} />
      <TimezoneList time={this.props.time} collection={this.props.timezones} />
    </div>;
  }
});