$(function(){
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
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
        }
    })
    //渲染表单数据
    initUserInfo();
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败');
                }
                form.val('formUserInfo',res.data);
            }
        })
    }
    //重置按钮
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo();
      })
    //提交按钮
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新失败');
                }
                layer.msg('更新成功');
                window.parent.getUserInfo();
            }
        })
    })
})