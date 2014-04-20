var React = require('react');
var moment = require('moment-timezone');

module.exports = React.createClass({
  // getInitialState: function(){
  //   return { time: new Date() };
  // },
  render: function() {
    var displayTime = moment( this.props.time ).format('h:mm a');
    return <div>
      <h2>{displayTime}</h2>
    </div>;
  }
});