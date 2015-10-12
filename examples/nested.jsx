var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <Foo content={<Nested />}>
      </Foo>
    );
  }
})