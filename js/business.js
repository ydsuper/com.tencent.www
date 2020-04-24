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


    // business导航
    let bizTop = $('.biz-nav').offset().top;
    $(window).scroll(function () {
        let v = $(this).scrollTop();
        if (v >= bizTop) {
            $('.biz-nav-roll').addClass('biz-nav-fixed');
        } else {
            $('.biz-nav-roll').removeClass('biz-nav-fixed');
        }
    })
    // resize变化
    $(window).resize(function () {
        $('.biz-nav .biz-list').css({
            paddingLeft: 16
        })
    })



    // app弹窗
    // 弹窗隐藏
    $('.app-pop .close').click(function () {
        $('.app-pop').hide();
    })
    // 点击弹窗
    $('.appintro .item').click(function () {
        let itemName = $(this).attr('t-name'); // 当前对象name
        // 弹窗显示
        $('.app-pop').show();
        // 数据
        let data = tocPopData['zh-cn'];
        // 匹配
        for (i = 0; i < data.length; i++) {
            if (data[i].name == itemName) {
                let data = tocPopData['zh-cn'][i];
                // 搭建数据
                $('.app-pop .logo-pic>img').attr('src', data.src);
                $('.app-pop .name').html(data.name);
                $('.app-pop .label').html(data.label);
                if (data.url == '') {
                    $('.app-pop .go').hide();
                } else {
                    $('.app-pop .go').show();
                    $('.app-pop .go').attr('href', data.url);
                }
                $('.app-pop .desc').empty(); // 清空
                $.each(data.desc, function (i, desc) {
                    $('.app-pop .desc').append(`<p>${desc.text}</p>`)
                })

                break; // 减少操作
            }
        }
    })


    // [business_to-b]
    // 智慧产业tab
    $('.brand-item-wdid .con-bottom>.tab-box li').mouseenter(function () {
        let index = $(this).index();
        $(this).addClass('active-t').siblings('li').removeClass('active-t');
        $('.brand-item-wdid .con-bottom>.pic-box li').eq(index).addClass('active-p').siblings('li').removeClass('active-p')
    })










})