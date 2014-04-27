var React        = require('react'),
    TimeSelect   = require('./timeSelect.jsx'),
    TimezoneList = require('./timezoneList.jsx');

module.exports = React.createClass({
  render: function() {
    return <div className="container">
      <TimeSelect time={this.props.time} />
      <TimezoneList time={this.props.time} timezones={this.props.timezones} />
    </div>;
  }
});