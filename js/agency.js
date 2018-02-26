
// only display mobile icons when non-safari
/*$(document).ready(function(){
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  if (iOSSafari) {
    document.getElementById("mobile-icons").style.display = "none";
  }
});
*/

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
    console.log(data);

    $('form[id=contactForm] #success').hide();
    $('form[id=contactForm] #error').hide();
  

    if (data.result == "success") {
      $('form[id=contactForm] #success').show();
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
