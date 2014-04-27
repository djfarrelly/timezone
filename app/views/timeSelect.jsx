var React  = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      menuOpen: false
    };
  },

  toggleSelectTimeMenu: function() {

    // testing:
    this.props.time.add('m', 1);

    this.setState({ menuOpen: !this.state.menuOpen });
  },

  render: function() {
    
    var displayTime = this.props.time.format('h:mm a');

    return <header>
      <h2 className="active-time" onClick={this.toggleSelectTimeMenu}>
        {displayTime}
      </h2>
      <div className={ this.state.menuOpen ? 'select-time-menu open' : 'select-time-menu closed' }>
        <h3>Time</h3>
      </div>
    </header>;

  }
});