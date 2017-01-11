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
        tpl : {
            closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
            next     : '<a title="Следующая" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
            prev     : '<a title="Предыдущая" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
        helpers: {
            overlay : {
                locked : false
            }
        }
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
        }
        e.preventDefault();
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
        });
    });
});

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

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
    $('.form-file').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
    });
}