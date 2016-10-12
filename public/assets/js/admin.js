var myBase = {};

// get host name.
myBase.pathArray     = window.location.href.split( '/' );
myBase.protocol      = myBase.pathArray[0];
myBase.host          = myBase.pathArray[2];
myBase.href_base = myBase.protocol + '//' + myBase.host;

function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart; 
    } else if (document.selection) {
        el.focus();
        var r = document.selection.createRange(); 
        if (r == null) { 
            return 0;
        }
        var re = el.createTextRange(), rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
    }
    return 0; 
}

// ajax interactive group (join, leave group).
$('.user_interactive_group').click(function(){
    var type     = $(this).attr('data-type');
    var group_id = $(this).attr('data-group-id');

    $.ajax({
        type:"POST",
        url:myBase.href_base+"/admin/community/group/user/connect",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{type: type, group_id: group_id},
        dataType:'json',
        success:function(kq){
            if(kq['value']){
                location.reload();
            }else{
                $('.error-3 .text').html(kq['message']);
            }
        },
        error:function(){
            //alert("sorry, error when use ajax!!!!");
        }
    });
});

// like or unlike topic.
$('.like-topic').click(function(){
	var topic_id = $(this).attr('data-topic-id');
	var at_this = $(this);
	$.ajax({
        type:"POST",
        url:myBase.href_base+"/admin/community/topic/likes",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{topic_id: topic_id},
        dataType:'json',
        success:function(kq){
        	if(kq){
        		if(kq.process){
        			if(kq.type == 1){
        				at_this.addClass('btn-like-2');
        				at_this.removeClass('btn-like');
        				$('.num_like_topic').html(kq.num_like);
        			}else{
        				at_this.addClass('btn-like');
        				at_this.removeClass('btn-like-2');
        				$('.num_like_topic').html(kq.num_like);
        			}
        		}
        	}
        },
        error:function(){
            //alert("sorry, error when use ajax!!!!");
        }
    });
	// num_like_topic
});

// add comment.
$(".box-comment").on('keyup', '#comment-post', function (event) {
    if (event.keyCode == 13) {
        var content = this.value;  
        var caret = getCaret(this);          
        if(event.shiftKey){
            this.value = content.substring(0, caret - 1) + "\n" + content.substring(caret, content.length);
            event.stopPropagation();
        } else {           	
           	var content = content.substring(0, caret - 1) + content.substring(caret, content.length),
           	 	topic_id = $(this).attr('data-topic-id');

           	// ajax send message.
           	$.ajax({
		        type:"POST",
		        url:myBase.href_base+"/admin/community/comments",
		        beforeSend: function (xhr) {
		            var token = $('meta[name="csrf_token"]').attr('content');
		            if (token) {
		                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
		            }
		        },
		        data:{content: content, topic_id: topic_id},
		        dataType:'json',
		        success:function(kq){
		        	if(kq){
		            	$('#comment-post').val("");
		            	$('.main-comment').prepend(kq['item']);
		            	$('#num_comment_topic').html(kq['num_comment']);
		        	}
		        },
		        error:function(){
		            //alert("sorry, error when use ajax!!!!");
		        }
		    });
        }
    }
});

// like or unlike commment.
$(".box-comment").on('click', '.like-comment', function(){
	var comment_id = $(this).attr('data-comment-id');
	var at_this = $(this);

	$.ajax({
        type:"POST",
        url:myBase.href_base+"/admin/community/comment/likes",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{comment_id: comment_id},
        dataType:'json',
        success:function(kq){
        	if(kq){
        		if(kq.process){
        			if(kq.type == 1){
        				at_this.addClass('btn-like-2');
        				at_this.removeClass('btn-like');
        				$('.num-like-comment-'+comment_id).html(kq.num_like);
        			}else{
        				at_this.addClass('btn-like');
        				at_this.removeClass('btn-like-2');
        				$('.num-like-comment-'+comment_id).html(kq.num_like);
        			}
        		}
        	}
        },
        error:function(){
            //alert("sorry, error when use ajax!!!!");
        }
    });
	// num_like_topic
});


// add sub comment : load data_sub comment.
$(".box-comment").on('click','.sub-comment-click',function (){
	var comment_id = $(this).attr('data-comment');

	$('#sub-comment-'+comment_id).toggleClass("hidden");
	// load data_sub comment.

	$.ajax({
        type:"GET",
        url:myBase.href_base+"/admin/community/subComments",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{comment_id: comment_id},
        dataType:'json',
        success:function(kq){
        	if(kq){
            	$('.main-sub-comment-'+comment_id).html(kq);
        	}
        },
        error:function(){
            //alert("sorry, error when use ajax!!!!");
        }
    });
});

// add sub comment : add new.
$(".box-comment").on('keyup','.sub-comment-post',function (){
	if (event.keyCode == 13) {
        var content = this.value;
        var caret = getCaret(this);
        if(event.shiftKey){
            this.value = content.substring(0, caret - 1) + "\n" + content.substring(caret, content.length);
            event.stopPropagation();
        } else {           	
           	var content = content.substring(0, caret - 1) + content.substring(caret, content.length),
           	 	comment_id = $(this).attr('data-comment-id');
           	 	$(this).val("");
           	// ajax.
           	$.ajax({
		        type:"POST",
		        url:myBase.href_base+"/admin/community/subComments",
		        beforeSend: function (xhr) {
		            var token = $('meta[name="csrf_token"]').attr('content');
		            if (token) {
		                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
		            }
		        },
		        data:{content: content, comment_id: comment_id},
		        dataType:'json',
		        success:function(kq){
		        	if(kq){
		            	$('.main-sub-comment-'+comment_id).prepend(kq['item']);
		            	$('#num-sub-comment-'+comment_id).html(kq['num_comment']);
		        	}
		        },
		        error:function(){
		            //alert("sorry, error when use ajax!!!!");
		        }
		    });
        }
    }
});

// return : public/assets/js/admin.js

// base
// @koala-prepend "base/config.js"

// main.

// community.
// @koala-prepend "admin/community/group.js"
// @koala-prepend "admin/community/topic.js"
// @koala-prepend "admin/community/comment.js"
// @koala-prepend "admin/community/subComment.js"