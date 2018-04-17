

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Display the form status
var displayMailChimpStatus = function (data) {
    //console.log(data);

    $('form[id=contactForm] #error').hide();
  
    if (data.result == "success") {
        $('#confirm-contact-success').modal();
    } else {
      $('form[id=contactForm] #error').show();
    }

};

// Async contact form
$('form[id=contactForm]').submit(function(e) {

  e.preventDefault();  
  $.ajax({
        type: "GET",
        url: $(this).attr('action') + "&c=displayMailChimpStatus",
        data: $(this).serialize(),
        cache: false,
        dataType: 'jsonp',
        contentType: "application/json; charset=utf-8"
      });
});

// Contact form validation
$.validate({
  modules : 'html5, toggleDisabled'
});
