var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <Button.State mini>
          <Label />
          foo
        </Button.State>
      </div>
    );
  }
})