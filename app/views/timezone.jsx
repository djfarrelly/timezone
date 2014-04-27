var React = require('react'),
    moment = require('moment-timezone');

module.exports = React.createClass({
  render: function() {

    // We clone the time object itself so the this time is bound to
    // the global app time
    console.info( 'time', this.props.time );
    var localTime   = moment( this.props.time ).zone( parseInt( this.props.offset, 10) ),
        displayTime = localTime.format('h:mm a'),
        offset      = localTime.format('Z');

    return <div className="timezone">
      <h3 className="timezone-time">{displayTime}</h3>
      <p className="timezone-offset">{offset}</p>
      {this.props.model.map(function(person){
        return <div className="person">
            <img src={person.avatar} className="avatar"/>
            <p className="person-name">{person.name}</p>
          </div>;
      })}      
    </div>;
  }
});