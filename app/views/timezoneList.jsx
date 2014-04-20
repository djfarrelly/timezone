var React = require('react');
var Timezone = require('./timezone.jsx');

module.exports = React.createClass({
  render: function() {
    
    var list = this.props.collection.map(function(model){
      return <Timezone time={this.props.time} model={model} />;
    }.bind(this));

    return <div className="timezone-list">
      {list}
    </div>;
  }
});