import React from 'react';
var Button = require('button');
var {Label} = require('label');

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