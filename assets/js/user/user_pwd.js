$(function() {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！';
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    });

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        var authorization = '';
        $.ajax({
            method: 'POST',
            url: '/api/auth/login',
            data: {
                email: 'haniyo123@qq.com',
                password: '123456'
            },
            success: function(res) {
                console.log(res);
                authorization = res.access_token;

            }
        });
        console.log(authorization);
        $.ajax({
            method: 'POST',
            url: '/api/auth/password/update',
            headers: {
                'Authorization': authorization
            },
            data: {
                old_password: $('[name=oldPwd]').val(),
                password: $('[name=newPwd]').val(),
                password_confirmation: $('[name=rePwd]').val()
            },
            success: function(res) {
                console.log(res);
            }
        });
    })


})