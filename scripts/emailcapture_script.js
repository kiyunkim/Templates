  'use strict';

  var mnt_emailcapture = (function (option) {
    var self = this,
      proto = mnt_emailcapture.prototype,

      scrollAmount = option.scrollAmount || 600,
      overlay = option.overlay,
      container = option.container,
      containerClass = option.containerClass,
      delayms = option.delayms,
      signupSide = option.signupSide,
      confirmSide = option.confirmSide,
      email_input = option.email_input,
      closebtn = option.closebtn,
      submitbtn = option.submitbtn,
      error = option.error,
      custom = option.custom || false,
      customDiv = option.customDiv,

      cookieName = option.cookieName,
      cookieValue = option.cookieValue,
      cookieClosed = option.cookieClosed;

    // cookie functions
    function setCookie(cName, cValue) {
      document.cookie = cName + "=" + cValue + ";path=/";
    };
    function getCookie(cName) {
      var name = cName + "=",
        decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    function checkCookie(cName, cValue) {
      var val = getCookie(cName);
      if (cValue == val) { return true; } else { return false; }
    };

    // what happens when user submits their email:
    proto.submit = function (emailAddress) {
      $.ajax({
        type: "POST",
        url: ' ',
        data: ({ email: emailAddress, vendor: '' }),
        success: function (serverData) {
          if (serverData.split('^')[0] !== 'Success') {
            error.html('We\'re sorry. There\'s been a server error. <!-- No success msg. -->');
          } else {
            proto.confirm(emailAddress);
          }
        },
        error: function () {
          error.html('We\'re sorry. There\'s been a server error. <!-- $.ajax error. -->');
        },
        dataType: 'text'
      });
    };

    // what happens after successful submitting:
    proto.confirm = function (address) {
      if (custom) {
        // custom email comfirmation popup:
        $(signupSide).hide();
        $(confirmSide).show();
        setCookie(cookieName, cookieClosed);
      }
      else {
        // default email confirmation popup:
        var $popup = $('#confirmation-popup');
        $('body').append('<div id="confirmation-fader" class="plcc-email-fader"></div><div id="confirmation-popup" class="plcc-email-popup"></div>');
        $popup.load('/Catalog/email_confirm_popup.aspx', function () {
          $popup.find('span.display-email').html(address);
          $('#confirmation-popup a.close, #confirmation-fader').on('click', function () {
            $('#confirmation-fader, #confirmation-popup').remove();
          });
          $popup.addClass('loaded');
        });
      }
      //
    };

    proto.setup = function () {
      var input_error = 'email-error',
        emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // close function
      function close() {
        $(container).removeClass(containerClass);
        $(overlay).fadeOut();
        // uncomment below to have experience not show again until end of session
        // setCookie(cookieName, cookieClosed);
      }
      $(closebtn).click(function () {
        close();
      });
      $(overlay).click(function () {
        close();
      });

      // submit function
      $(submitbtn).click(function () {
        // if no email address is put in
        if ($(email_input).val() === '' || $(email_input).val() === 'Enter your email address') {
          $(email_input).addClass(input_error);
          $(error).html('Please enter your email address.');
        }
        // if invalid email is put in
        else if (!emailRegex.test($(email_input).val())) {
          $(email_input).addClass(input_error);
          $(error).html('Email address doesn\'t appear to be valid.');
        }
        // if successful
        else {
          proto.submit($(email_input).val());
        }
      });

      $(email_input)
        // on enter
        .on('keypress', function (e) {
          if (e.which === 13) { $(submitbtn).click(); }
        });

      function show_emailcap() {
        if (checkCookie(cookieName, cookieClosed) !== true) {
          // show email capture
          $(container).delay(delayms).queue(function () {
            $(container).addClass(containerClass).dequeue();
            $(overlay).fadeIn('fast').dequeue();
          });
          setCookie(cookieName, cookieValue);
        }
      }

      if (option) {
        if (option.onScroll) {
          option.onScroll = false;
          $(window).scroll(function () {
            var y = $(this).scrollTop();
            if (y >= scrollAmount) {
              show_emailcap();
            }
          });
        } else {
          show_emailcap();
        }
      }

    };

    return {
      setup: self.setup
    };
  });

  $(document).ready(function () {

    var emailcapture = new mnt_emailcapture({

      onScroll: false,                         // false: show immediately, true: show on scroll 
      scrollAmount: 600,                       // amount in px to scroll before showing (default: 600)
      overlay: '.emailcap_overlay',
      container: '#emailcap_container',        // main container
      containerClass: 'show',                  // class to add to main container
      delayms: 0,                           // number of miliseconds to wait before adding the class 
      signupSide: '#emailcap_signup',         // sign up side
      confirmSide: '#emailcap_confirmation',   // confirmation side
      email_input: '#email_popup_form_id',     // email input
      submitbtn: '#email_popup_submit_id',     // submit button
      closebtn: '.iconClose',                  // close button
      error: '#emailcap_error',                // error div 
      custom: true,                            // true if using a custom confirmation message (default: false)
      customDiv: '.emailcap_confirmation',     // custom confirmation message div

      cookieName: 'mnt_ELemailcapCookie',      // cookie name
      cookieValue: 'true',                     // cookie initial value
      cookieClosed: 'closed'                   // cookie value when experience has been closed

    });
    emailcapture.setup();
  });
