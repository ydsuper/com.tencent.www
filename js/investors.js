$(function () {
    // 监听滚动事件
    let windowTop = 0;
    let showHeadState = true;
    $(window).scroll(function () {
        let v = $(this).scrollTop();
        if (v > windowTop) {
            $('.head-nav .nav-item').hide();
            $('.wrap-head').stop().css({
                top: -72
            })
            windowTop = v;
        } else {
            $('.head-nav .nav-item').show();
            if (showHeadState) {
                $('.wrap-head').stop().css({
                    top: 0
                })
            }
            windowTop = v;
        }
    })

    // 投资者日历[tab栏] + [下拉列表]
    // tab
    $('.ivcal-box .tab-list>li').click(function () {
        $(this).addClass('active-tab').siblings('li').removeClass('active-tab');
        // tab-con
        let index = $(this).index();
        $('.ivcal-box .tab-con>li').eq(index).addClass('active-con').siblings('li').removeClass('active-con');
    })
    // 下拉
    $('.ivcal-box .tab-con>li .item').click(function () {
        if ($(this).hasClass('up')) {
            $(this).addClass('down');
            let $this = $(this);
            setTimeout(function () {
                $this.removeClass('up');
                $this.removeClass('down');
            }, 450);
        } else {
            $(this).toggleClass('up');
        }
        $(this).find('.detail').stop().slideToggle();
    })


    // investors-Elevator导航
    let navTop = $('.ele-navigation').offset().top;
    let navTopArr = []; // navTop数据
    $('[id^="investors-con"]').each(function (i) {
        navTopArr.push(parseInt($(this).offset().top));
    })
    // 滚动事件
    $(window).scroll(function () {
        let v = $(this).scrollTop();
        if (v >= navTop) {
            $('.ele-navigation').addClass('fixed');
        } else {
            $('.ele-navigation').removeClass('fixed');
        }

        // 校准对应栏
        $.each(navTopArr, function (i, top) {
            if (v >= top) {
                $('.underline').stop().animate({
                    left: $('.ele-navigation li').eq(i).position().left,
                    width: $('.ele-navigation li').eq(i).width()
                }, 200)
            }
        })
    })

    // 点击滑动
    $('.ele-navigation li').click(function () {
        showHeadState = false; // 关闭状态
        // underline
        $('.underline').stop().animate({
            left: $(this).position().left,
            width: $(this).width()
        }, 200)
        // 滑动
        let index = $(this).index();
        let skipTop = navTopArr[index];
        $('html,body').stop().animate({
            scrollTop: skipTop
        }, 200);

        // 延时 可显示状态true
        setTimeout(function () {
            showHeadState = true;
        }, 300)
    })

})