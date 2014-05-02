var React        = require('react'),
    TimezoneList = require('./timezoneList.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      timeFormat: 'h:mm a'
    }
  },
  toggleTimeFormat: function() {
    this.setState({
      timeFormat: this.state.timeFormat === 'h:mm a' ? 'H:mm' : 'h:mm a'
    });
  },
  render: function() {
    
    var displayTime = this.props.time.format( this.state.timeFormat );

    return <div className="container">
      <header>
        <h2 className="active-time" onClick={this.toggleTimeFormat}>
          {displayTime}
        </h2>
      </header>
      <TimezoneList time={this.props.time}
                    timeFormat={this.state.timeFormat}
                    timezones={this.props.timezones} />
    </div>;
  }
});