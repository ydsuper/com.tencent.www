$(function () {
    // 【页头部分】
    (function () {
        let v = $(window).scrollTop();
        if (v != 0) {
            $('.wrap-head').stop().css({
                top: -72
            })
        }
    })()
    // 移入移出导航
    $('.head-nav').hover(function () {
            $('.nav-hook').show();
            $('.logo a').addClass('logo_show');
            $('.head-nav .nav-item>.title').addClass('title_hover');
            $('.head-con .lang').addClass('lang_show');
            $('.head-con .lang>a').addClass('a_show');
            $('.head-show').stop().animate({
                opacity: 1,
                height: 516
            }, 300)
        },
        function () {
            let v = $(window).scrollTop();
            $('.nav-hook').hide();
            $('.head-show').stop().animate({
                opacity: 0,
                height: 0
            }, 160, function () {
                if (v == 0) {
                    $('.logo a').removeClass('logo_show');
                    $('.head-nav .nav-item>.title').removeClass('title_hover');
                    $('.head-con .lang').removeClass('lang_show');
                    $('.head-con .lang>a').removeClass('a_show');
                }
            })
        })

    // 导航列表移入移出
    $('.head-nav .nav-item').hover(function () {
        $(this).find('.nav-list').show().addClass('list_hover');
        $(this).siblings('.nav-item').find('.nav-list').hide().removeClass('list_hover');

    }, function () {
        $('.head-nav .nav-item .nav-list').hide().removeClass('list_hover');
    })


    // 监听滚动事件
    let windowTop = 0;
    $(window).scroll(function () {
        let v = $(this).scrollTop();
        if (v == 0) {
            $('.wrap-head').css('backgroundColor', '');
            $('.head-con .lang').removeClass('lang_show');
            $('.head-con .lang>a').removeClass('a_show');
            $('.logo a').removeClass('logo_show');
            $('.head-nav .nav-item>.title').removeClass('title_hover');
        } else {
            $('.wrap-head').css('backgroundColor', '#fff');
            $('.logo a').addClass('logo_show');
            $('.head-nav .nav-item>.title').addClass('title_hover');
            $('.head-con .lang').addClass('lang_show');
            $('.head-con .lang>a').addClass('a_show');
        }

        if (v > windowTop) {
            $('.wrap-head').stop().css({
                top: -72
            })
            windowTop = v;
        } else {
            $('.wrap-head').stop().css({
                top: 0
            })
            windowTop = v;
        }

    })


    // 【主体】
    // 连接 -共生未来
    setTimeout(function () {
        $('.banner-txt').animate({
            opacity: 1,
            top: 351
        })
        let word = 0;
        let timer = setInterval(function () {
            word++;
            if (word == 5) {
                word = 1;
                $('.banner-txt .banner-hook>ul').css('top', '0px')
            };

            $('.banner-txt .banner-hook>ul').animate({
                top: -(word * 81)
            })

        }, 2000)

    }, 500)


    // connect连接tab栏
    $('.connect-tab>.tab-list li').mouseenter(function () {
        $(this).addClass('current').siblings('li').removeClass('current');
        // tab内容
        let index = $(this).index();
        $('.connect-con>.con').eq(index).stop(0).fadeIn().siblings('.con').stop().fadeOut(0);
    })

    // rspbve轮播图-opacity
    let rbNum = 0;
    // 右按钮
    $('.rspbve-area>.slide-area .icon_arrow_r').click(function () {
        rbNum++;
        if (rbNum == $('.rspbve-area>.slide-area li').length) rbNum = 0;
        $('.rspbve-area>.slide-area li').eq(rbNum).stop().animate({
            opacity: 1
        }, 300).siblings('li').stop().animate({
            opacity: 0
        }, 300)
    })
    // 左按钮
    $('.rspbve-area>.slide-area .icon_arrow_l').click(function () {
        rbNum--;
        if (rbNum < 0) rbNum = $('.rspbve-area>.slide-area li').length - 1;
        $('.rspbve-area>.slide-area li').eq(rbNum).stop().animate({
            opacity: 1
        }, 300).siblings('li').stop().animate({
            opacity: 0
        }, 300)
    })
    // 自动播放
    let rbTimer = setInterval(function () {
        $('.rspbve-area>.slide-area .icon_arrow_r').click();
    }, 4000)


    // tasdvp轮播图-opacity
    let tdNum = 0;
    // 自动播放
    function tasdvp_slide(i) {
        tdNum++;
        if (tdNum == $('.tasdvp-area>.slide-area>.slide-list li').length) tdNum = 0;
        $('.tasdvp-area>.slide-area>.slide-list li').eq(tdNum).stop().animate({
            opacity: 1
        }, 300).siblings('li').stop().animate({
            opacity: 0
        }, 300)
        // 删 添 删 添 [效果不一般]
        $('.tasdvp-area>.slide-area>.slide-tab li').removeClass('active');
        $('.tasdvp-area>.slide-area>.slide-tab li').eq(tdNum).addClass('active');
        $('.tasdvp-area>.slide-area>.slide-tab li').removeClass('active');
        $('.tasdvp-area>.slide-area>.slide-tab li').eq(tdNum).addClass('active');
    }
    let tdTimer = setInterval(tasdvp_slide, 5000);
    // 点击小点
    $('.tasdvp-area>.slide-area>.slide-tab li').click(function () {
        clearInterval(tdTimer)
        tdNum = $(this).index() - 1;
        tasdvp_slide();
        tdTimer = setInterval(tasdvp_slide, 4000);
    })


})