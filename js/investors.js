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













    

})