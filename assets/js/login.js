$(function () {
    //切换登陆和注册模块
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //从layui获取form对象
    var form = layui.form;
    var layer=layui.layer;
    //通过form.verify函数自定义校验规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repwd: function (val) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== val) {
                return '两次密码不一致'
            }
        }
    });

    //监听注册表单提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
               return layer.msg(res.message);
            }
            layer.msg('注册成功');
            setTimeout(function(){$('#link_login').click()},3000)            
        })
    })
    //监听登陆表单登陆事件
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('登陆成功');
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})