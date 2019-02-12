
$('li[id=li-capture]').on('click', function (e) {
    $('img[id=img-capture]').attr('src',"/img/iconCapture@2x.png")
    $('img[id=img-capture]').attr('srcset',"/img/iconCapture.png 1x, /img/iconCapture@2x.png 2x")
    $('img[id=img-need]').attr('src',"/img/iconNeedInactive@2x.png")
    $('img[id=img-need]').attr('srcset',"/img/iconNeedInactive.png 1x, /img/iconNeedInactive@2x.png 2x")
    $('img[id=img-sync]').attr('src',"/img/iconSyncInactive@2x.png")
    $('img[id=img-sync]').attr('srcset',"/img/iconSyncInactive.png 1x, /img/iconSyncInactive@2x.png 2x")
});

$('li[id=li-need]').on('click', function (e) {
    $('img[id=img-capture]').attr('src',"/img/iconCaptureInactive@2x.png")
    $('img[id=img-capture]').attr('srcset',"/img/iconCaptureInactive.png 1x, /img/iconCaptureInactive@2x.png 2x")
    $('img[id=img-need]').attr('src',"/img/iconNeed@2x.png")
    $('img[id=img-need]').attr('srcset',"/img/iconNeed.png 1x, /img/iconNeed@2x.png 2x")
    $('img[id=img-sync]').attr('src',"/img/iconSyncInactive@2x.png")
    $('img[id=img-sync]').attr('srcset',"/img/iconSyncInactive.png 1x, /img/iconSyncInactive@2x.png 2x")
});

$('li[id=li-sync]').on('click', function (e) {
    $('img[id=img-capture]').attr('src',"/img/iconCaptureInactive@2x.png")
    $('img[id=img-capture]').attr('srcset',"/img/iconCaptureInactive.png 1x, /img/iconCaptureInactive@2x.png 2x")
    $('img[id=img-need]').attr('src',"/img/iconInactiveNeed@2x.png")
    $('img[id=img-need]').attr('srcset',"/img/iconNeedInactive.png 1x, /img/iconNeedInactive@2x.png 2x")
    $('img[id=img-sync]').attr('src',"/img/iconSync@2x.png")
    $('img[id=img-sync]').attr('srcset',"/img/iconSync.png 1x, /img/iconSync@2x.png 2x")
});



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

// Async mailchimp contact form
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
    form: '#contactForm',
    modules : 'html5, toggleDisabled'
});
  
