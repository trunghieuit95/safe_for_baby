var item_num = 5;
var item_curent = 1;
var enabl = 0;
pathArray     = window.location.href.split( '/' );
protocol      = pathArray[0];
host          = pathArray[2];
var href_base = protocol + '//' + host;

$('#sb-changepass').click(function(){
	var password    = $('.form-forgot input[name="password"]').val();
	var re_password = $('.form-forgot input[name="re_password"]').val();
	var id = $(this).attr('data-id');
	var code = $(this).attr('data-code');

    if(password == '' || re_password == ''){
        $('.tb-1').removeClass('hidden');
        setTimeout(function(){
            $('.tb-1').addClass('hidden');
        },5000);
    }

    $.ajax({
        type:"POST",
        url:href_base+"/account/change-forgot-password",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{password: password, re_password: re_password, id: id, code: code},
        dataType:'json',
        success:function(kq){
            if(kq == '1'){
                $('.tb-1').addClass('hidden');
                $('.tb-3').addClass('hidden');
                $('.tb-2').removeClass('hidden');
                setTimeout(function(){
                    $('.tb-2').addClass('hidden');
                },5000);
            }else{
            	if(kq == 2){
                    $('.tb-1').addClass('hidden');
                    $('.tb-2').addClass('hidden');
            		$('.tb-3').removeClass('hidden');
            		setTimeout(function(){
                    	$('.tb-3').addClass('hidden');
	                },5000);
            	}
            }
        },
        error:function(){
        }
    });

    return false;
});