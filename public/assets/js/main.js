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

var Bebeboo = {};
Bebeboo.Baby = {};

Bebeboo.Baby.options = {
	baby_list 			: [],
	baby_num 			: 3,
	baby_active 		: 1,
    width 				: 136, // 10 + 116+ 10
};

Bebeboo.Baby.init = function(babies = [], baby_active = null){
	Bebeboo.Baby.options.baby_list = babies;
	Bebeboo.Baby.options.baby_active = baby_active;

	// chang opacity hidden => 0.
	var active_index = babies.indexOf(baby_active);
	$('.header-baby-2 .baby-list .item').css('opacity', 0);
	$('.item-baby-'+active_index).css('opacity',1);

	var show_1 = active_index - 1;
	if( show_1 > -1){
		$('.item-baby-'+show_1).css('opacity',1);
	}

	var show_2 = active_index + 1;
	if(show_2 < babies.length ){
		$('.item-baby-'+show_2).css('opacity',1);
	}else{
		$('.add-new-baby-list').css('opacity',1);
	}

	// init add new baby.
	var dateToday = new Date();
	var year_now = dateToday.getFullYear();

	var date_before_1 = new Date();
	var date_before_3 = new Date();
	var date_after_1 = new Date();

	date_before_1.setFullYear(year_now - 1);
	date_before_3.setFullYear(year_now - 3);
	date_after_1.setFullYear(year_now + 1);

	$('#calendar-nds').datepicker({
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		minDate: dateToday,
		maxDate: date_after_1,
		currentText: "Now",
		dateFormat: "dd/mm/yy"
	});

	$('#calendar-kcc').datepicker({
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		minDate: date_before_1,
		maxDate: dateToday,
		currentText: "Now",
		dateFormat: "dd/mm/yy"
	});

	$('#calendar-birthday').datepicker({
		inline: true,
		firstDay: 1,
		showOtherMonths: true,
		dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		minDate: date_before_3,
		maxDate: dateToday,
		currentText: "Now",
		dateFormat: "dd/mm/yy"
	});

	// add avatar baby.
	function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#upload-avatar-baby').css('background-image', 'url('+e.target.result+')');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#upload-avatar-baby-input").change(function(){
        readURL(this);
    });
};



// change baby.
$(".header-baby-2 .item-baby .cover-item-wp").on("click", function (e) {
    e.preventDefault();
    var parent = $(this).parent();
    Bebeboo.Baby.change_baby(parent);
});

Bebeboo.Baby.change_baby = function(object){
	var object_id = object.attr('data-id');

	if(object_id != Bebeboo.Baby.options.baby_active){
		// check object_id in array.
		var object_index = Bebeboo.Baby.options.baby_list.indexOf(object_id);

		// send ajax get info.

		/**
		 * ajax complete
		**/

		// change css.
		Bebeboo.Baby.change_baby_css(object_index, object);

		// change avaible.
		Bebeboo.Baby.options.baby_active = object_id;
	}
};

// change css.
Bebeboo.Baby.change_baby_css = function(object_index, object){
	var active_index = Bebeboo.Baby.options.baby_list.indexOf(Bebeboo.Baby.options.baby_active);

	if( object_index > active_index ){
		// hidden: object_index - 2
		var hidden = object_index - 2;
		if( hidden > -1){
			$('.item-baby-'+hidden).css('opacity',0);
		}

		// show: object_index + 1 hoac add-new-baby-list
		var show = object_index + 1;
		if(show < Bebeboo.Baby.options.baby_list.length ){
			setTimeout(function(){
				$('.item-baby-'+show).css('opacity',1);
			}, 150);
		}else{
			setTimeout(function(){
				$('.add-new-baby-list').css('opacity',1);
			}, 150);
		}
	}else{
		// hidden: object_index + 2
		var hidden = object_index + 2;
		if(hidden < Bebeboo.Baby.options.baby_list.length ){
			$('.item-baby-'+hidden).css('opacity',0);
		}else{
			$('.add-new-baby-list').css('opacity',0);
		}

		// show: object_index -1
		var show = object_index - 1;
		if( show > -1){
			setTimeout(function(){
				$('.item-baby-'+show).css('opacity',1);
			}, 150);
		}
	}

	var tranX = (1 - object_index)*Bebeboo.Baby.options.width;
	$('.header-baby-2 .baby-list').css('transform', 'translate3d('+tranX+'px, 0px, 0px)');

	$('.header-baby-2 .item-baby').removeClass('active');
	object.addClass('active');
	object.css('opacity',1);
};

var rootParent = '#popup-add-baby ';
var input_nds = null;
// item-add-1
$(rootParent + "#baby-item-add-1 .btn-1").on("click", function (e) {
	$(rootParent + '.box-select').css('display','none');

	$(rootParent + '.gct-1').removeClass('active');
	$(rootParent + '.gct-2').addClass('active');
	//$(rootParent + '.box-add-baby').slideDown('500');
	$(rootParent + '.box-add-baby').css('display','block');
});
$(rootParent + "#baby-item-add-1 .btn-2").on("click", function (e) {
	$(this).addClass('active');
	
	$(rootParent + "#baby-item-add-2").slideDown('fast');
});

// item-add-2
$(rootParent + "#baby-item-add-2 .btn-1").on("click", function (e) {
	$(rootParent + "#baby-item-add-2 .btn-check").removeClass('active'); 
	$(this).addClass('active');

	$(rootParent + "#baby-item-add-3").css('display', 'none');
	$(rootParent + "#baby-item-add-5").css('display', 'none');

	$(rootParent + "#baby-item-add-4").slideDown('fast');
	$(rootParent + "#baby-item-add-6").css('display', 'block');
});
$(rootParent + "#baby-item-add-2 .btn-2").on("click", function (e) {
	$(rootParent + "#baby-item-add-2 .btn-check").removeClass('active');
	$(this).addClass('active');

	$(rootParent + "#baby-item-add-4").css('display', 'none');
	$(rootParent + "#baby-item-add-6").css('display', 'none');

	$(rootParent + "#baby-item-add-3").slideDown('fast');
});

// item-add-3
$(rootParent + "#baby-item-add-3 input").on("change", function (e) {
	var calendar_kcc = $(this).val();
	var calendar_kcc_parse = calendar_kcc.split('/');
	
	// calculate due date.
	var calendar_nds = new Date(calendar_kcc_parse[2],calendar_kcc_parse[1],calendar_kcc_parse[0]);
	calendar_nds.setDate(calendar_nds.getDate() + 280);

	var m_ = parseInt(calendar_nds.getMonth()) + 1;
	input_nds = calendar_nds.getDate() + '/' + m_ + '/' + calendar_nds.getFullYear();

	$(rootParent + "#baby-item-add-5 span").html(input_nds);
	$(rootParent + "#baby-item-add-5").css('display', 'block');
	$(rootParent + "#baby-item-add-6").css('display', 'block');
});

// item-add-4
$(rootParent + "#baby-item-add-4 input").on("change", function (e) {
	input_nds = $(this).val();
});

// submit form.
$(rootParent + ".btn-add-baby").on("click", function (e) {
	$.ajax({
        type:"POST",
        url:myBase.href_base+"/babies",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{birth_date: input_nds, type: 0},
        dataType:'json',
        success:function(kq){
        	if(kq.value){
            	window.location = myBase.href_base+"/babies/"+kq.baby_id;
        	}
        },
        error:function(){
            //alert("sorry, error when use ajax!!!!");
        }
    });
});

// back to 1.
$(rootParent + '.gct-1').on("click", function (e){
	$(rootParent + '.box-add-baby').css('display','none');

	$(rootParent + '.gct-2').removeClass('active');
	$(rootParent + '.gct-1').addClass('active');
	$(rootParent + '.box-select').slideDown('700');
});

var input_gender_baby_add = null;

$(rootParent + ".box-add-baby-content .item-gender").on("click", function (e) {
	$(rootParent + ".box-add-baby-content .item-gender").removeClass('active');
	$(this).addClass('active');

	input_gender_baby_add = $(this).attr('data-value');
});

// submit form.
$(rootParent + ".btn-add-new-baby").on("click", function (e) {
	// check valid.
	var avatar         = $('#upload-avatar-baby-input').val();
	var name           = $('#baby-name').val();
	var birth_date     = $('#calendar-birthday').val();
	var gender         = input_gender_baby_add;
	var place_of_birth = $('#place_of_birth').val();

	if( name == "" || birth_date == "" || gender == null || place_of_birth == ''){
		$('.err-add').removeClass('hidden');

		setTimeout(function(){
			$('.err-add').addClass('hidden');
		}, 3000);
	}else{
		$.ajax({
	        type:"POST",
	        url:myBase.href_base+"/babies",
	        beforeSend: function (xhr) {
	            var token = $('meta[name="csrf_token"]').attr('content');
	            if (token) {
	                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
	            }
	        },
	        data:{birth_date: birth_date, avatar: avatar, name: name, gender: gender, place_of_birth: place_of_birth, type: 1 },
	        dataType:'json',
	        success:function(kq){
	        	console.log(kq);
	        	if(kq.value){
	            	window.location = myBase.href_base+"/babies/"+kq.baby_id;
	        	}
	        },
	        error:function(){
	        }
	    });
	}	
});


// base
// @koala-prepend "base/config.js"

// baby.
// @koala-prepend "client/baby/init.js"
// @koala-prepend "client/baby/baby_change.js"
// @koala-prepend "client/baby/add_fetus.js"
// @koala-prepend "client/baby/add_baby.js"

// community.