pathArray     = window.location.href.split( '/' );
protocol      = pathArray[0];
host          = pathArray[2];
var href_base = protocol + '//' + host;

function isRealValue(obj){
    return obj && obj !== "null" && obj!== "undefined";
}
/*- core main*/
$(document).ready(function(){
	$('.li-rd-page.active ul').css('display','block');

	$('.li-child').click(function(){
		var add_act = $(this).parent('li');
		var act = $('.li-rd-page').filter('.active');

		if(add_act.attr('class') != 'li-rd-page active'){
			// reset.
			act.find('ul').slideUp('fast');
			act.removeClass('active');
			
			// add active
			add_act.find('ul').slideDown('fast');
			add_act.addClass('active');
		}else{
			// close.
			act.find('ul').slideUp('fast');
			act.removeClass('active');
		}

	});
});

$(document).click(function() {
    $('.wp-content-box-admin').removeClass('active');
});
$('.view-all-admin').click(function(){
    $('.wp-content-box-admin').addClass('active');
    //event.stopPropagation();
    return false;
});

/*-- dt-table --*/
function metisTable() {
    "use strict";

    /*----------- BEGIN TABLESORTER CODE -------------------------*/
    /* required jquery.tablesorter.min.js*/
    $(".sortableTable").tablesorter();/*- END TABLESORTER CODE-*/

    // BEGIN datatable CODE
    /*$('#dataTable').dataTable({
        "sDom": "<'pull-right'l>t<'row'<'col-lg-6'f><'col-lg-6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "Hiển thị _MENU_"
        },
        "order": [[ 0, "desc" ]]
    });
    
    $('#dataTable3').dataTable({
        "sDom": "<'pull-right'l>t<'row'<'col-lg-6'f><'col-lg-6'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "Hiển thị _MENU_"
        },
        "order": [[ 0, "desc" ]]
    });*/
    
    $('#dataTable-new').dataTable({
        "sDom": "<'pull-right'l>t<'row'<'col-lg-6'f><'col-lg-6 my-class'p>>",
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "Hiển thị _MENU_ <span class='fa fa-caret-down'></span>"
        },
        "order": [[ 0, "desc" ]]
    }); //END datatable CODE

    // BEGIN action table CODE
    /*
    $('#actionTable button.remove').on('click', function() {
        $(this).closest('tr').remove();
    });
    $('#actionTable button.edit').on('click', function() {
        $('#editModal').modal({
            show: true
        });
        var val1 = $(this).closest('tr').children('td').eq(1),
        val2 = $(this).closest('tr').children('td').eq(2),
        val3 = $(this).closest('tr').children('td').eq(3);
        $('#editModal #fName').val(val1.html());
        $('#editModal #lName').val(val2.html());
        $('#editModal #uName').val(val3.html());


        $('#editModal #sbmtBtn').on('click', function() {
            val1.html($('#editModal #fName').val());
            val2.html($('#editModal #lName').val());
            val3.html($('#editModal #uName').val());
        });

    });// END action table CODE
*/
}
function metisSortable() {
  	$('.inner .row').sortable({});
}

$('#handbook_cate').change(function(){
    var cate_id = $(this).val();

    if(cate_id != ''){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/handbooks/ajax-get-list-subcate",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{cate_id: cate_id},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('#handbook_subcate').removeClass('hidden');
                    $('#handbook_subcate select').html(kq);
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('#handbook_subcate').addClass('hidden');
        $('#handbook_subcate_2').addClass('hidden');
        $('#handbook_subcate_3').addClass('hidden');
    }
});

$('#handbook_subcate select').change(function(){
    var parent_id = $(this).val();

    if(parent_id != ''){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/handbooks/ajax-get-list-subcate-2",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{parent_id: parent_id},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('#handbook_subcate_2').removeClass('hidden');
                    $('#handbook_subcate_2 select').html(kq);
                }else{
                    $('#handbook_subcate_2').addClass('hidden');
                    $('#handbook_subcate_3').addClass('hidden');
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('#handbook_subcate_2').addClass('hidden');
        $('#handbook_subcate_3').addClass('hidden');
    }
});

$('#handbook_subcate_2 select').change(function(){
    var parent_id = $(this).val();

    if(parent_id != ''){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/handbooks/ajax-get-list-subcate-2",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{parent_id: parent_id},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('#handbook_subcate_3').removeClass('hidden');
                    $('#handbook_subcate_3 select').html(kq);
                }else{
                    $('#handbook_subcate_3').addClass('hidden');
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('#handbook_subcate_3').addClass('hidden');
    }
});

/* ------------- weeknew ------------- */
$('#weeknew_cate').change(function(){
    var weeknew_cate = $(this).val();

    if(weeknew_cate != ''){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/weeknew/ajax-change-cate",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{weeknew_cate: weeknew_cate},
            dataType:'json',
            success:function(kq){
                if(kq != ''){                    
                    //alert(kq['data']);
                    $('#week_title .text-sp').html(kq['name']);
                    $('#week_title').removeClass('hidden');
                    $('#content-weeknew').html(kq['data']);

                    /*for($j = 1; $j <= 6; $j++ ){                        
                        editor = CKEDITOR.instances['content['+$j+']'];
                        if(isRealValue(editor)){
                            editor.destroy();      
                        }
                    }*/

                    kq['array_count'].forEach(function(value) {
                        CKEDITOR.replace( 'content['+value+']',{
                            customConfig : 'config.js',
                            //language: 'en',
                            filebrowserImageBrowseUrl: '/laravel-filemanager?type=Images',
                            filebrowserImageUploadUrl: '/laravel-filemanager/upload?type=Images&_token=mEqvEAK7XbunpK1vB7jK3ck4j1SmHu2utLHQHFr6'
                        });
                    }); 
                }else{
                    $('#week_title .text-sp').html('');
                    $('#week_title').addClass('hidden');
                    $('#content-weeknew').html('');
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('#week_title .text-sp').html('');
        $('#week_title').addClass('hidden');
        $('#content-weeknew').html('');
    }
});

$('.time_index').keyup(function(){
    var time_index = $(this).val();
    var weeknew_cate = $('#weeknew_cate').val();

    if(weeknew_cate != '' && time_index > 0){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/weeknew/ajax-change-time-index",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{weeknew_cate: weeknew_cate, time_index : time_index},
            dataType:'json',
            success:function(kq){
                if(kq != ''){                    
                    if(kq == 1){
                        $('.text-alert-weeknew').removeClass('hidden');
                        $('.title-topic-weeknew').val('');
                    }else{
                        $('.text-alert-weeknew').addClass('hidden');
                        $('.title-topic-weeknew').val(kq);
                    }
                }else{
                    $('.text-alert-weeknew').addClass('hidden');
                    $('.title-topic-weeknew').val(kq);
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('.text-alert-weeknew').addClass('hidden');
        $('.title-topic-weeknew').val(kq);
    }
});

/* time_vacxin */
$('.time_vacxin').keyup(function(){
    var time = $(this).val();

    if(time > 0){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/vacxin_time/ajax/check",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{time: time},
            dataType:'json',
            success:function(kq){
                if(kq == 1){
                    $('.text-alert-vacxin').removeClass('hidden');
                    $(this).val('');
                }else{
                    $('.text-alert-vacxin').addClass('hidden');
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('.text-alert-vacxin').addClass('hidden');
    }
});

/* --------------------- add new injection  ------------------------ */
$('#injection_add').change(function(){
    var time_id = $(this).val();
    var vacxin_id = $(this).attr('data-vx-id');

    if( time_id != '' && vacxin_id != ''){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/vacxin-injection/add",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{time_id: time_id, vacxin_id: vacxin_id},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('#tt-vv-box').append(kq);
                }
            },
            error:function(xhr, ajaxOptions, thrownError){
                //alert(xhr.status);
                //console(thrownError);
            }
        });
    }
});

// delete.
$('#tt-vv-box').on('click','.delete-injection', function(){
    var pr = $(this).attr('data-pr');
    var vacxin_injection = $('#'+pr).attr('data');

    if( vacxin_injection != ''){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/vacxin-injection/delete",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{vacxin_injection: vacxin_injection},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('#'+pr).addClass('hidden');
                }
            },
            error:function(xhr, ajaxOptions, thrownError){
                //alert(xhr.status);
                console(thrownError);
            }
        });
    }
})

/* antenatalCares */
$('.antenatalCares_time').keyup(function(){
    var time = $(this).val();

    if(time > 0){
        $.ajax({
            type:"POST",
            url:href_base+"/admin/antenatalCares/ajax/check",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{time: time},
            dataType:'json',
            success:function(kq){
                if(kq == 1){
                    $('.text-alert-vacxin').removeClass('hidden');
                    $(this).val('');
                }else{
                    $('.text-alert-vacxin').addClass('hidden');
                }
            },
            error:function(){ 
                //alert("sorry, error when use ajax!!!!");
            }
        });
    }else{
        $('.text-alert-vacxin').addClass('hidden');
    }
});

$('.add-lich-kham').click(function(){
    var val = $('.val-lich-kham').val();
    var id = $('.val-lich-kham').attr('data-id');

    if(val != ''){        
        $.ajax({
            type:"POST",
            url:href_base+"/admin/antenatal-care-action/add",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{name: val, id: id},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('.val-lich-kham').val('');
                    $('#delete-action-box').append(kq);
                }
            },
            error:function(xhr, ajaxOptions, thrownError){
                //alert(xhr.status);
                //console(thrownError);
            }
        });
    }
});

// delete.
$('#delete-action-box').on('click','.delete-action-antenal', function(){
    var pr = $(this).attr('data-pr');
    var antenatal = $('#'+pr).attr('data');

    if( antenatal != ''){ console.log(antenatal);
        $.ajax({
            type:"POST",
            url:href_base+"/admin/antenatal-care-action/delete",
            beforeSend: function (xhr) {
                var token = $('meta[name="csrf_token"]').attr('content');
                if (token) {
                    return xhr.setRequestHeader('X-CSRF-TOKEN', token);
                }
            },
            data:{antenatal: antenatal},
            dataType:'json',
            success:function(kq){
                if(kq != ''){
                    $('#'+pr).addClass('hidden');
                }
            },
            error:function(xhr, ajaxOptions, thrownError){
                //alert(xhr.status);
                console(thrownError);
            }
        });
    }
})