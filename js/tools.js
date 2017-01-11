$(document).ready(function() {

    $('.about-basis-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.about-basis-menu li').index(curLi);
            $('.about-basis-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.about-basis-tab.active').removeClass('active');
            $('.about-basis-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.gallery-item a, .main-gallery-item a').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        margin: 0,
        padding: 0,
        maxWidth: 970,
        minWidth: 480,
        topRatio: 0,
        aspectRatio: true,
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
			thumbs	: {
				width	: 86,
				height	: 58
			}
        },
        beforeShow: function() { this.title += '<div class="fancybox-title-date">' + $(this.element).data('date') + '</div><a href="' + $(this.element).attr('href') + '" download class="fancybox-download-link"></a>'}
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('.why-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.why-menu li').index(curLi);
            $('.why-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.why-tab.active').removeClass('active');
            $('.why-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.geography-menu li a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            var curIndex = $('.geography-menu li').index(curLi);
            $('.geography-menu li.active').removeClass('active');
            curLi.addClass('active');

            $('.geography-list.active').removeClass('active');
            $('.geography-list').eq(curIndex).addClass('active');
            $('.geography-menu-value').html($(this).html());
            $('.geography-menu-wrap').removeClass('open');
        }
        e.preventDefault();
    });

    $('.geography-menu-value').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parent().filter('.geography-menu-wrap').length == 0) {
            $('.geography-menu-wrap').removeClass('open');
        }
    });

    $('.geography-item-feedback-link').click(function(e) {
        var curBlock = $(this).parent();
        if (curBlock.hasClass('open')) {
            curBlock.removeClass('open');
        } else {
            $('.geography-item-feedback.open').removeClass('open');
            curBlock.addClass('open');
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.geography-item-feedback').length == 0) {
            $('.geography-item-feedback.open').removeClass('open');
        }
    });

    $('.footer-feedback-link').click(function(e) {
        var curBlock = $(this).parent();
        curBlock.toggleClass('open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.footer-feedback').length == 0) {
            $('.footer-feedback.open').removeClass('open');
        }
    });

    $('.nav-mobile-link').click(function(e) {
        $('html').toggleClass('nav-mobile-open');
        e.preventDefault();
    });

    $('.nav-mobile > ul > li.with-submenu > a').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('.services-menu-mobile').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false,
        dots: true
    });

});

$(window).on('load resize', function() {
    $('.main-scheme').each(function() {
        var curScheme = $(this);
        var curWidth = curScheme.width();
        var originalWidth = curScheme.find('.main-scheme-img').data('width');
        var curScale = curWidth / originalWidth;
        curScheme.find('.main-scheme-point').each(function() {
            var curPoint = $(this);
            var curLeft = Number(curPoint.css('left').replace('px', ''));
            var curTop = Number(curPoint.css('top').replace('px', ''));
            curPoint.css({'margin-left': curLeft * curScale - curLeft, 'margin-top': curTop * curScale - curTop});
            if (curWidth - (curLeft * curScale) < 585) {
                curPoint.addClass('right');
            } else {
                curPoint.removeClass('right');
            }
            if (curWidth < 1200) {
                if (curWidth - (curLeft * curScale) < 215) {
                    curPoint.find('.main-scheme-point-content').css({'margin-left': (-215 - (215 - (curWidth- (curLeft * curScale)))) + 'px'});
                }
                if (curLeft * curScale < 215) {
                    curPoint.find('.main-scheme-point-content').css({'margin-left': (-215 + (215 - curLeft * curScale)) + 'px'});
                }
            } else {
                curPoint.find('.main-scheme-point-content').removeAttr('style');
            }
        });
    });
});

$(window).on('load resize', function() {
    if ($(window).width() < 1200) {
        if (!$('.main-gallery-list').hasClass('slick-slider')) {
            $('.main-gallery-list').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                arrows: false,
                dots: true
            });
        }
    } else {
        if ($('.main-gallery-list').hasClass('slick-slider')) {
            $('.main-gallery-list').slick('unslick');
        }
    }
});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});

    curForm.find('.form-file input').change(function() {
        var curInput = $(this);
        var curField = curInput.parent().parent();
        curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        }
    });
}

function checkErrors() {
    $('.form-checkbox, .form-input, .form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0 || curField.find('textarea.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0 || curField.find('textarea.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}