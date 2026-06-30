(function ($) {
    'use strict';

    function initFeather() {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 700, once: true, offset: 80 });
        }
    }

    function initStickyHeader() {
        var header = $('.neo-header');
        $(window).on('scroll', function () {
            header.toggleClass('sticky', $(this).scrollTop() > 80);
        });
    }

    function initBackToTop() {
        var btn = $('.backto-top');
        $(window).on('scroll', function () {
            btn.toggleClass('visible', $(this).scrollTop() > 400);
        });
        btn.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    }

    function initMobileMenu() {
        $('.neo-hamburger, .humberger-menu').on('click', function (e) {
            e.preventDefault();
            $('.popup-mobile-menu').addClass('menu-open');
            $('html').css('overflow', 'hidden');
        });

        $('.close-menu-activation, .popup-mobile-menu .nav-link').on('click', function (e) {
            e.preventDefault();
            $('.popup-mobile-menu').removeClass('menu-open');
            $('html').css('overflow', '');
        });

        $('.popup-mobile-menu').on('click', function (e) {
            if (e.target === this) {
                $(this).removeClass('menu-open');
                $('html').css('overflow', '');
            }
        });
    }

    function initSmoothScroll() {
        $(document).on('click', '.smoth-animation', function (event) {
            event.preventDefault();
            var target = $($.attr(this, 'href'));
            if (target.length) {
                $('html, body').animate({ scrollTop: target.offset().top - 70 }, 400);
            }
        });
    }

    function initOnePageNav() {
        if ($.fn.onePageNav) {
            $('.onepagenav').onePageNav({
                currentClass: 'current',
                changeHash: true,
                scrollSpeed: 500,
                scrollThreshold: 0.2,
                filter: ':not(.external)',
                easing: 'swing'
            });
        }
    }

    function initContactForm() {
        $('.rwt-dynamic-form').on('submit', function (e) {
            e.preventDefault();
            var form = $(this);
            var btn = form.find('button[type="submit"]');
            btn.prop('disabled', true);
            form.find('.error-msg, .success-msg').remove();

            $.ajax({
                url: 'mail.php',
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    btn.prop('disabled', false);
                    if (data.code === false) {
                        btn.after('<div class="error-msg"><p>*' + data.err + '</p></div>');
                    } else {
                        btn.after('<div class="success-msg"><p>' + data.success + '</p></div>');
                        form.find('input, textarea').val('');
                        setTimeout(function () { $('.success-msg').fadeOut('slow'); }, 5000);
                    }
                },
                error: function () {
                    btn.prop('disabled', false);
                    btn.after('<div class="error-msg"><p>*Form backend unavailable. Email hillches@gmail.com directly.</p></div>');
                }
            });
        });
    }

    $(document).ready(function () {
        initFeather();
        initAOS();
        initStickyHeader();
        initBackToTop();
        initMobileMenu();
        initSmoothScroll();
        initOnePageNav();
        initContactForm();
    });
})(jQuery, window);
