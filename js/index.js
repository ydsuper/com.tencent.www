$(function () {

    // 当前位置F5之后







    // 【页头部分】
    // 移入移出导航
    $('.head-nav').hover(function () {
            $('.nav-hook').show();
            $('.logo a').addClass('logo_show');
            $('.head-nav .nav-item>.title').addClass('title_hover');
            $('.head-con .lang').addClass('lang_show');
            $('.head-con .lang>a').addClass('a_show');
            $('.head-show').stop().animate({
                opacity: 1,
                height: 446
            }, 300)
        },
        function () {
            $('.nav-hook').hide();
            $('.head-con .lang').removeClass('lang_show');
            $('.head-con .lang>a').removeClass('a_show');
            $('.head-show').stop().animate({
                opacity: 0,
                height: 0
            }, 160, function () {
                $('.logo a').removeClass('logo_show');
                $('.head-nav .nav-item>.title').removeClass('title_hover');
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






})