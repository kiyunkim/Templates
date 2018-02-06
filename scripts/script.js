'use strict';
var ObjConstructor = (function (option) {
  var self = this,
    proto = ObjConstructor.prototype,

    myVariable = option.myVariable,
    anotherVariable = option.anotherVariable;

  proto.myFunc = function () {
    // .. 
  };

  proto.setup = function () {
    proto.myFunc();
  };

  return { setup: self.setup };
});

$(document).ready(function () {
  var myObject = new ObjConstructor({
    myVariable: '',
    anotherVariable: ''
  });
  myObject.setup();
});
