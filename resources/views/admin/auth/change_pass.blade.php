@extends('admin.layout.master')

@section('title')
	BebebooManage | Change password
@stop

@section('right-content')
    <div class="right-header-wp">
        <div class="right-header">
            <div class="left-h pull-left">
                <i class="fa fa-sign-in"></i><span>Change password</span>
            </div>

            <div class="right-h pull-right">
                <a class="btn-back" href="<?php echo route('admin.questions.index')?>">Hủy</a>

                <span class="btn-add" onclick="$('#form-add').submit();">SAVE</span>
            </div>
        </div>
    </div>

    <div class="right-box">
        <form class="form-horizontal" id="form-add" role="form" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="left-form style-1">
                <div class="item-left-form">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Mật khẩu cũ <span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" name="password" required="">
                        </div>
                    </div>
    
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Mật khẩu mới <span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" name="newpass" required="">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Nhập lại mật khẩu mới <span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" name="re-newpass" required="">
                        </div>
                    </div>

                    <p class="tb">
                        <span class="err-1 hidden">Mật khẩu cũ chưa đúng</span>
                        <span class="err-2 hidden">Mật khẩu mới nhập lại chưa đúng</span>
                        <span class="ss hidden">Thay đổi mật khẩu thành công</span>
                    </p>
                </div>
            </div>
            
            <div class="right-form style-1">
                <div class="item-right-form item-note">
                    <div class="form-group ">
                        <label for="inputEmail3" class="col-xs-12 control-label">Chú ý :</label>
                        <p>Trường có dấu <span class="node-req">*</span> là bắt buộc !</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <script type="text/javascript">
        $(document).ready(function(){
            pathArray     = window.location.href.split( '/' );
            protocol      = pathArray[0];
            host          = pathArray[2];
            var href_base = protocol + '//' + host;

            $('#form-add').submit(function(){
                var password   = $('#form-add input[name="password"]').val();
                var newpass    = $('#form-add input[name="newpass"]').val();
                var re_newpass = $('#form-add input[name="re-newpass"]').val();
                
                if( newpass != re_newpass){
                    // mat khau nhap lai sai.
                    $('.tb .err-2').removeClass('hidden');
                    setTimeout(function(){
                        $('.tb .err-2').addClass('hidden');
                    },3000);
                    $('#form-add input[name="re-newpass"]').val('');

                    return false;
                }
                console.log(password);
                console.log(newpass);
                console.log(re_newpass);
                $.ajax({
                    type:"POST",
                    url:href_base+"/admin/change-pass",
                    beforeSend: function (xhr) {
                        var token = $('meta[name="csrf_token"]').attr('content');
                        if (token) {
                            return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                        }
                    },
                    data:{password: password, newpass: newpass, re_newpass: re_newpass},
                    dataType:'json',
                    success:function(kq){
                        if(kq == 1){
                            // success.
                            $('.tb .ss').removeClass('hidden');
                            setTimeout(function(){
                                $('.tb .ss').addClass('hidden');
                            },3000);

                            $('#form-add input[name="password"]').val('');
                            $('#form-add input[name="newpass"]').val('');
                            $('#form-add input[name="re-newpass"]').val('');
                        }else{
                            // mat khau cu sai.
                            $('.tb .err-1').removeClass('hidden');
                            setTimeout(function(){
                                $('.tb .err-1').addClass('hidden');
                            },3000);

                            $('#form-add input[name="password"]').val('');
                        }
                    },
                    error:function(){ 
                        //alert("sorry, error when use ajax!!!!");
                    }
                });

                return false;
            });
        });
    </script>
@stop