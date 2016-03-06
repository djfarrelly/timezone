var React = require('react');
var moment = require('moment-timezone');

module.exports = React.createClass({
  person: function(){
    return this.props.model;
  },

  hasAvatar: function() {
    return !!this.person().avatar;
  },

  renderAvatarBlock: function() {
    if(this.hasAvatar()) {
      return <img className="avatar" src={this.person().avatar} />;
    } else {
      return <span className="pseudo-avatar"><strong>{this.getNameInitials()}</strong></span>;
    }
  },

  getNameInitials: function() {
    var hasInitial = new RegExp(/[A-Z]/);
    if (hasInitial.test(this.person().name)) { 
      return this.person().name.replace(/[^A-Z]/g, '');
    } else {
      return this.person().name.substring(0,1);
    }
  },

  render: function() {
    var person = this.person();

    return <div className="person" key={person.name}>
      {this.renderAvatarBlock()}
      <div className="person-info">
        <p className="person-name">{person.name}</p>
        <p className="person-city">{person.city}</p>
      </div>
    </div>;
  }
});
