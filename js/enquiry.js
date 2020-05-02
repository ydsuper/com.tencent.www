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


    // 【表单校验】
    let $flag = false; // 内容
    let smFlag = false; // 提交
    // 点击提交
    $('#submit').click(function () {
        // 判断内容
        if ($('#message').val().trim()) {
            $flag = true;
            if (!isApply) {
                $('.row .errorNote').each(function (i, ipt) {
                    $(this).removeClass('errorhide');
                })
                // 是否为空
                $('.row input').each(function (i, ipt) {
                    $('#submit').val('正在提交');
                    setTimeout(function () {
                        if (!smFlag) $('#submit').val('提交');
                        if (!$(ipt).val().trim()) {
                            $(ipt).parent('.row').addClass('inputError');
                        }
                        $('.select-selected').each(function (i, sele) {
                            if ($(this).text() == '- 请选择 -') {
                                $(this).parent('.row').addClass('inputError');
                            }
                        })
                    }, 150)
                })
            }
        } else {
            $flag = false;
            if (!isApply) {
                $('#submit').val('正在提交');
                setTimeout(function () {
                    alert('请输入内容');
                    $('#submit').val('提交');
                }, 150)
                $('.row .errorNote').each(function (i, ipt) {
                    $(this).addClass('errorhide');
                })
            }
        }

    })

    // 点击ipt sele
    $('.row input').click(function () {
        $(this).parent('.row').removeClass('inputError');
    })
    // message输入
    $('#message').keyup(function () {
        let $num = $(this).val().length;
        $('.textAreaBox .countArea').text($num + "/700");
    })

    // 类型 查询 sele
    $('.select-selected').click(function (e) {
        let $this = this;
        $($this).toggleClass('active-arrow');
        e.stopPropagation(); // 阻止冒泡
        $(document).one('click', function () {
            $($this).removeClass('active-arrow');
            $($this).next('.select-items').toggleClass('select-hide');
        })
        // select列表
        $($this).next('.select-items').toggleClass('select-hide');
    })
    // 列表选中
    $('.select-items').on('click', 'div', function () {
        $(this).parents('.row').removeClass('inputError');
        $(this).parent().prev('.select-selected').text($(this).text());
        $('.row.enquiryHide').removeClass('enquiryHide'); // 显示查询
    })

    // 选中类型 控制查询
    $('.select-items:eq(0)').on('click', 'div', function () {
        $('.select-items:eq(1) div').removeClass('select-disabled');
        $.each($(this).data(), function (i, sele) {
            if (sele == 0) {
                let index = i.substr(i.length - 1, 1) - 1;
                $('.select-items:eq(1) div').eq(index).addClass('select-disabled');
            }
        })
    })
    // 选中查询 控制类型
    $('.select-items:eq(1)').on('click', 'div', function () {
        $('.select-items:eq(0) div').removeClass('select-disabled');
        let index = $(this).index() + 1;
        $.each($('.select-items:eq(0) div'), function (i, sele) {
            if ($(sele).data()['sele' + index] == 0) {
                $(sele).addClass('select-disabled');
            }
        })
    })


    // 验证码
    //初始化验证码
    var verifyCode = new GVerify({
        id: "vcodeImg", //容器的ID
        type: "blend" //图形验证码的类型：blend-数字字母混合类型（默认）、number-纯数字、letter-纯字母
    });
    //刷新验证码
    $('#vcodeRefresh').click(function () {
        verifyCode.refresh();
    })
    //校验验证码
    //  verifyCode.validate('校验的值'); //如果校验正确返回ture，校验错误返回false

    $('#submit').click(function () {
        if (!isApply) {
            // 判断 $flag
            if ($flag) {
                let val = $('#vcode').val();

                if (verifyCode.validate(val)) {
                    $('#vcode').parent('.row').removeClass('inputError');
                } else {
                    $('#vcode').parent('.row').addClass('inputError');
                }
            }
        }

    })


    // 邮箱
    $('#submit').click(function () {
        if (!isApply) {
            // 判断 $flag
            if ($flag) {
                let email = $('#email').val();
                let flag = email.indexOf('@');
                let onlyFlag = email.split('@');
                setTimeout(function () {
                    if (flag == -1 || flag == 0 || flag == email.length - 1 || onlyFlag.length != 2) {
                        $('#email').parent('.row').addClass('inputError');
                    } else {
                        $('#email').parent('.row').removeClass('inputError');
                    }
                }, 150)
            }
        }

    })


    // 重置
    $('#reset').click(function () {
        $('.select-items:eq(1) div').one('click', resetSele)

        function resetSele() {
            $('.select-selected:eq(0)').text('- 请选择 -');
        }
        $('.select-items:eq(0) div').one('click', function () {
            $('.select-items:eq(1) div').off('click', resetSele);
        })
    })


    // 提交成功
    let isApply = false;
    $('#submit').click(function () {
        $('#submit').val('正在提交');
        let flag = $flag && $('.row.inputError').length == 0;
        let date = getTimeD();
        let nowDate = +new Date();
        if (flag) smFlag = true;
        setTimeout(function () {
            if (date == null) {
                if (flag) {
                    apply();
                    setTimeD() // 存储时间D
                }
            } else {
                if (nowDate - date >= 5000) {
                    if (flag) {
                        apply();
                        setTimeD() // 存储时间D
                    } else {
                        isApply = false;
                        smFlag = false;
                        $('#submit').val('提交');
                    }
                } else {
                    apply();
                }
            }

        }, 150)

    })


    // 提交申请中 初始化
    applyStart();

    function applyStart() {
        let date = getTimeD();
        if (date == null) {
            isApply = false;
        } else {
            let nowDate = +new Date();
            if (nowDate - date >= 5000) {
                isApply = false;
            } else {
                isApply = true;
            }
        }
    }
    // 提交申请
    function apply() {
        alert('您的查询已经提交，谢谢。');
        $('#reset').click();
        $('#submit').val('提交');
        smFlag = false;
        isApply = true;
    }


    // 设置时间D
    function setTimeD() {
        console.log(1);
        localStorage.setItem('timeD', JSON.stringify(+new Date()));
    }
    // 获取时间D
    function getTimeD() {
        return JSON.parse(localStorage.getItem('timeD'));
    }

})