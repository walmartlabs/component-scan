import React from 'react';
import Foo from 'foo';
import Nested from 'foo';

module.exports = React.createClass({
  render: function() {
    return (
      <Foo content={<Nested />} a b c>
      </Foo>
    );
  }
})