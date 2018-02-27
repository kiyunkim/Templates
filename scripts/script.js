'use strict';
var ObjConstructor = (function (option) {
  var self = this,
    proto = ObjConstructor.prototype,

    myVariable = option.myVariable,
    anotherVariable = option.anotherVariable;

  /**
   * Represents a book.
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  function Book(title, author) {
    // .. 
  }

  proto.myFunc = function () {
    Book();
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
