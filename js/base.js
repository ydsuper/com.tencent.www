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
    $('.logo a').addClass('logo_show');
    $('.head-nav .nav-item>.title').addClass('title_hover');
    $('.head-con .lang').addClass('lang_show');
    $('.head-con .lang>a').addClass('a_show');

    // 移入移出导航
    $('.head-nav').hover(function () {
            $('.nav-hook').show();
            $('.head-show').stop().animate({
                opacity: 1,
                height: 374 // 516 374
            }, 300)
        },
        function () {
            let v = $(window).scrollTop();
            $('.nav-hook').hide();
            $('.head-show').stop().animate({
                opacity: 0,
                height: 0
            }, 160)
        })

    // 导航列表移入移出
    $('.head-nav .nav-item').hover(function () {
        $(this).find('.nav-list').hide().show().addClass('list_hover');
        $(this).siblings('.nav-item').find('.nav-list').hide().removeClass('list_hover');
    }, function () {
        $('.head-nav .nav-item .nav-list').hide().removeClass('list_hover');
    })


    // 监听滚动事件
    // let windowTop = 0;
    // var showHeadState = true;
    // $(window).scroll(function () {
    //     let v = $(this).scrollTop();
    //     if (v > windowTop) {
    //         $('.wrap-head').stop().css({
    //             top: -72
    //         })
    //         windowTop = v;
    //     } else {
    //         if (showHeadState) {
    //             $('.wrap-head').stop().css({
    //                 top: 0
    //             })
    //         }
    //         windowTop = v;
    //     }
    // })

})