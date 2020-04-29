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


    // media-Elevator导航
    let navTop = $('.ele-navigation').offset().top;
    let navTopArr = []; // navTop数据
    $('[id^="media-con"]').each(function (i) {
        navTopArr.push(parseInt($(this).offset().top));
    })
    console.log(navTopArr);

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


    // 媒体资料库tab栏
    $('.brand-item-medinfo .medinfo-tab>li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        let index = $(this).index();
        $('.brand-item-medinfo .con-ul>li').eq(index).addClass('active-con').siblings('li').removeClass('active-con')
    })


    // 视频弹窗
    // 隐藏
    $('.video-pop .close').click(function () {
        $('.video-pop').hide();
        $('.video-pop .video').attr('src', '');
    })
    // 弹窗
    let video = document.querySelector('.video-pop .video')
    $('.brand-item-medinfo .video-con li:not(.last-con)').click(function () {
        $('.video-pop').show();
        $('.video-pop .video').attr('src', $(this).data('url'));
        video.play(); // 原生play自动播放
    })

    // 图片弹窗
    // 隐藏
    $('.image-pop .close').click(function () {
        $('.image-pop').hide();
        $('.image-pop .video').attr('src', '');
    })
    // 弹窗
    let picNum = 0;
    $('.brand-item-medinfo .image-con li:not(.last-con)').click(function () {
        $('.image-pop').show();
        picNum = $(this).index();
        $('.image-pop .pic-list').eq(picNum).addClass('active-pic').siblings('.pic-list').removeClass('active-pic')
    })
    // 按钮切换
    $('.image-pop .next-btn').click(function () {
        picNum++;
        if (picNum >= $('.image-pop .pic-list').length) picNum = 0;
        $('.image-pop .pic-list').eq(picNum).addClass('active-pic').siblings('.pic-list').removeClass('active-pic')
    })
    $('.image-pop .pre-btn').click(function () {
        picNum--;
        if (picNum < 0) picNum = $('.image-pop .pic-list').length - 1;
        $('.image-pop .pic-list').eq(picNum).addClass('active-pic').siblings('.pic-list').removeClass('active-pic')
    })


})