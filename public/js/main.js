$('a[href^="#"]').click(function () {
    $('html, body').animate({
        scrollTop: $('[id="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 1500);

    return false;
});