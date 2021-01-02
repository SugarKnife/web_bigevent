$(function () {
  var layer = layui.layer;
  var $image = $('#image');
  const options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }

  $('#btnChooseImage').on('click', function () {
    $('#file').click();
  });
  $('#file').on('change', function (e) {
    var fileList = e.target.files;
    if (fileList.length === 0) {
      return layer.msg('请选择图片')
    }
    var file = fileList[0]
    var imgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  $('#btnUpload').on('click',function(e){
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png');
    $.ajax({
      method:'POST',
      url:'/my/update/avatar',
      data:{avatar:dataURL},
      success:function(res){
        if(res.status!==0){
          return layer.msg('上传头像失败');
        }
        layer.msg('上传头像成功');
        window.parent.getUserInfo();
      }
    })
  })
})
