$(function () {
    // 发展历程
    // [模板]
    // <li>
    //     <div class="tit">2019</div>
    //     <div class="item clearfix">
    //         <div class="month">xx月</div>
    //          <div class="info">xxxxx</div>
    //     </div>
    // </li>
    // 动态生成数据
    $.each(histData['zh-cn'], function (key, value) {
        // 数字从小到大排列  prepend置于前
        $('.history-con .history-main').prepend(`<li data-year="${key}"><div class="tit">${key}</div></li>`)
        $.each(value, function (i, item) {
            $(`.history-con .history-main>li[data-year=${key}]`).append(`
            <div class="item clearfix">
                <div class="month">${item.month}月</div>
                <div class="info">${item.text}</div>
            </div>`)
        })
    })

    // 点击历程节点
    $('.history-course').on('click', '.node', function () {
        nodeHistory($(this).data('year'));
    })

    // 历史节点函数封装
    function nodeHistory(key) {
        let left = $(`.history-main>li[data-year=${key}]`).offset().left - $(`.history-main>li[data-year=2019]`).offset().left;
        $('.history-con .history-main').css({
            'left': -left
        });

        $('.history-course .node').each(function (i) {
            if (key == $(this).data('year')) {
                $(this).addClass('active').siblings('.node').removeClass('active');
            }
        })
    }
    nodeHistory(2019);

    // 移动历程纲要
    $('.history-main').mousedown(function (e) {
        let xDown = e.pageX;
        let startX = parseInt($('.history-main')[0].style.left);

        // 移动  startX + 变化x
        $(document).mousemove(function (e) {
            let x = startX + (e.pageX - xDown);
            if (x > 0) x = 0;

            if (x < -($('.history-main>li').outerWidth(true) * ($('.history-main>li').length - 1))) {
                x = -($('.history-main>li').outerWidth(true) * ($('.history-main>li').length - 1))
            }
            $('.history-main').css({
                'left': x
            })

            moveHistory();
        })

        $(document).mouseup(function () {
            $(document).off('mousemove');
        })
    })

    // 判断函数封装
    function moveHistory() {
        var minX = {
            number: 666666,
            object: null
        };

        $('.history-main>li').each(function () {

            if (minX.number > Math.abs($(this).offset().left - $('.history-con .container').offset().left)) {
                console.log($(this).offset().left);
                minX.number = Math.abs($(this).offset().left - $('.history-con .container').offset().left);
                minX.object = this;
            }
        });
        $('.history-course .node').each(function (index) {
            if ($(this).data('year') == $(minX.object).data('year')) {
                $(this).addClass('active').siblings('.node').removeClass('active');
            }
        });
    }


    // 业务架构tab栏
    $('.bsnstr-tab>li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        let index = $(this).index();
        $('.bsnstr-list .tab-con>li').eq(index).addClass('active-con').siblings('li').removeClass('active-con');
    })


    // team弹窗
    // 弹窗隐藏
    $('.team-pop .close').click(function () {
        $('.team-pop').hide();
    })
    // 点击弹窗
    $('.team .team-member li').click(function () {
        // 弹窗显示
        $('.team-pop').show();
        // 数据
        let index = $(this).index();
        if (index > 15) index--;
        let data = teamData['zh-cn'][index];
        // 搭建数据
        $('.team-pop .pic>img').attr('src', data.src);
        $('.team-pop .name').html(data.name);
        $('.team-pop .job').empty();
        $.each(data.label, function (i, job) {
            $('.team-pop .job').append(`<p>${job.text}</p>`);
        })
        $('.team-pop .desc').empty();
        $.each(data.desc, function (i, job) {
            $('.team-pop .desc').append(`<p>${job.txt}</p>`);
        })
        // 修改desc高度 延时50
        setTimeout(function () {
            var l = $('.team-pop .job>p').length;
            if (l == 1) {
                $('.team-pop .desc').css('height', '200px')
            } else if (l == 2) {
                $('.team-pop .desc').css('height', '180px')
            } else if (l == 3) {
                $('.team-pop .desc').css('height', '150px')
            }
        }, 50)
    })

    // 办公地点tab栏
    $('.addr-tab li').click(function () {
        $(this).addClass('active').siblings('li').removeClass('active')
    })
    // 左右按钮
    $('.addr-tab .mc-left').click(function () {
        $('.addr-tab ul').css({
            left: 0,
            right: 'auto'
        })
        $(this).hide();
        $('.addr-tab .mc-right').show();
    })
    $('.addr-tab .mc-right').click(function () {
        $('.addr-tab ul').css({
            right: 0,
            left: 'auto'
        })
        $(this).hide();
        $('.addr-tab .mc-left').show();
    })


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

    // about-Elevator导航
    let navTop = $('.ele-navigation').offset().top;
    let navTopArr = []; // navTop数据
    $('[id^="about-con"]').each(function (i) {
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
        if ($flag) {
            $.each(navTopArr, function (i, top) {
                if (v >= top) {
                    setTimeout(function () {
                        $('.ele-navigation li').eq(i).addClass('active-ele').siblings('li').removeClass('active-ele');
                    }, 200);
                    $('.underline').stop().animate({
                        left: $('.ele-navigation li').eq(i).position().left,
                        width: $('.ele-navigation li').eq(i).width()
                    }, 200)
                }
            })
        }
    })

    // 点击滑动
    let $flag = true;
    $('.ele-navigation li').click(function () {
        $flag = false; // 节流滚动
        showHeadState = false; // 关闭状态
        // active-ele
        let $this = this;
        setTimeout(function () {
            $($this).addClass('active-ele').siblings('li').removeClass('active-ele');
        }, 200);
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
        // 滚动节流
        setTimeout(function () {
            $flag = true;
        }, 400);
    })


})