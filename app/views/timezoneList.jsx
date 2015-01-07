/** @jsx React.DOM */

var React    = require('react');
var Timezone = require('./timezone.jsx');

module.exports = React.createClass({
  render: function() {

    var offsets = Object.keys( this.props.timezones );

    offsets.sort(function(a, b){ return b - a; });

    return <div className="timezone-list">
      {offsets.map(function(offset){
        return <Timezone key={offset}
                         time={this.props.time}
                         timeFormat={this.props.timeFormat}
                         offset={offset}
                         model={this.props.timezones[ offset ]} />;
      }.bind(this))}
    </div>;
  }
});