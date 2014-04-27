var React    = require('react'),
    Timezone = require('./timezone.jsx');

module.exports = React.createClass({
  render: function() {

    var offsets = Object.keys( this.props.timezones );

    offsets.sort(function(a, b){ return b - a; });

    return <div className="timezone-list">
      {offsets.map(function(offset){
        return <Timezone time={this.props.time} 
                         offset={offset}
                         model={this.props.timezones[ offset ]} />;
      }.bind(this))}
    </div>;
  }
});