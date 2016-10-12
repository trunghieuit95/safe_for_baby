Init ();
var item_num = 5;
var item_curent = 1;
var enabl = 0;
pathArray     = window.location.href.split( '/' );
protocol      = pathArray[0];
host          = pathArray[2];
var href_base = protocol + '//' + host;
    
function MouseScroll (event) {
    if( enabl == 0){
        enabl = 1;
        var rolled = 0;
        if ('wheelDelta' in event) {
            rolled = event.wheelDelta;
        }
        else {  // Firefox
                // The measurement units of the detail and wheelDelta properties are different.
            rolled = -40 * event.detail;
        }

        if(rolled > 0){
            // up.
            if(item_curent == 1){
                // return none.
            }else{
                // change view up.
                item_curent --;
                changePhone(item_curent);
                upText(item_curent);
                change_fw(item_curent);
            }
        }else{
            // down.
            if(item_curent < item_num){
                // change view down.
                item_curent ++;
                changePhone(item_curent);
                downText(item_curent);
                change_fw(item_curent);
            }else{
                // return none. 
            }
        }

        setTimeout(function(){
            enabl = 0;
        },600);
    }
}

function changePhone(curent){
    $('.phone .phone-screen').removeClass('active');
    $('.phone .screen-'+curent).addClass('active');
}

function downText(curent){
    $('.content-sl .item').removeClass('active');
    $('.content-sl .item-'+curent).addClass('active animated fadeInUp');
    setTimeout(function(){
        $('.content-sl .item-'+curent).removeClass('animated fadeInUp');
    },1000);
}

function upText(curent){
    $('.content-sl .item').removeClass('active');
    $('.content-sl .item-'+curent).addClass('active animated fadeInDown');
    setTimeout(function(){
        $('.content-sl .item-'+curent).removeClass('animated fadeInDown');
    },1000);
}

function change_fw(curent){
    $('.box-fw-slide .item-fw').removeClass('active');
    $('.box-fw-slide .item-fw-'+curent).addClass('active');
}

function change_view(curent){
    $('#main-content .item').removeClass('item-view');
    $('#main-content .item-'+curent).addClass('item-view');
    $('#main-content .item-'+curent+' .box-text').addClass('animated bounceInDown');
    setTimeout(function(){
        $('#main-content .item-'+curent+' .box-text').removeClass('animated bounceInDown');
    },1000);
}

/* click */
$('.item-fw').click(function(){
    new_cr = parseInt($(this).attr('data-id'))

    if(new_cr > 0 && new_cr < item_curent){
        item_curent = new_cr;
        changePhone(item_curent);
        upText(item_curent);
        change_fw(item_curent);
    }

    if(new_cr > item_curent && new_cr <= item_num){
        item_curent = new_cr;
        changePhone(item_curent);
        downText(item_curent);
        change_fw(item_curent);
    }
});

function Init () {
        // for mouse scrolling in Firefox
    var elem = document.getElementById ("content");
    if (elem.addEventListener) {    // all browsers except IE before version 9
            // Internet Explorer, Opera, Google Chrome and Safari
        elem.addEventListener ("mousewheel", MouseScroll, false);
            // Firefox
        elem.addEventListener ("DOMMouseScroll", MouseScroll, false);
    }
    else {
        if (elem.attachEvent) { // IE before version 9
            elem.attachEvent ("onmousewheel", MouseScroll);
        }
    }
}

/* count down */
var date_end = (new Date("2016/05/12 00:00:00")).getTime();
var day_view, hour_view, min_view, sec_view;
var date_now = Date.now();
var duration = parseInt((date_end - date_now)/1000);

if( duration > 0){
    setInterval(function(){
        var date_now = Date.now();
        var duration = parseInt((date_end - date_now)/1000);

        day_view  = parseInt(duration/(24*60*60) , 10);
        hour_view = parseInt((duration - day_view*24*60*60)/(60*60));
        min_view  = parseInt((duration - day_view*24*60*60 - hour_view*60*60)/60);
        sec_view  = duration - day_view*24*60*60 - hour_view*60*60 - min_view*60;

        if(day_view < 10){ day_view = "0"+day_view;}
        if(hour_view < 10){ hour_view = "0"+hour_view;}
        if(min_view < 10){ min_view = "0"+min_view;}
        if(sec_view < 10){ sec_view = "0"+sec_view;}

        // set init.
        $('.digit .days').html(day_view);
        $('.elem-bottom .hours').html(hour_view);
        $('.elem-bottom .minutes').html(min_view);
        $('.elem-bottom .seconds').html(sec_view);
    },1000);
}

/* popup */
magnificPopup = $('.btn-send-ct').magnificPopup({
    type:'inline',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
        beforeOpen: function(e) {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },

    midClick: false // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
});
var magnificPopup = $.magnificPopup.instance;
$('.btn-cal').click(function(){
    magnificPopup.close(); 
});

/* ajax send contact*/
/*
$('.form-contact').submit(function(){
    var name    = $('.form-contact input[name="name"]').val();
    var email   = $('.form-contact input[name="email"]').val();
    var content = $('.form-contact textarea[name="content"]').val();
    
    $.ajax({
        type:"POST",
        url:href_base+"/add-contact",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{name: name, email: email, content: content},
        dataType:'json',
        success:function(kq){
            if(kq == '1'){
                $('.p-sb .tb-2').removeClass('hidden');
                setTimeout(function(){
                    $('.p-sb .tb-2').addClass('hidden');
                },3000);

                $('.form-contact input[name="name"]').val('');
                $('.form-contact input[name="email"]').val('');
                $('.form-contact textarea[name="content"]').val('');
            }else{
                $('.p-sb .tb-1').removeClass('hidden');
                setTimeout(function(){
                    $('.p-sb .tb-1').addClass('hidden');
                },3000);
            }
        },
        error:function(){ 
            //alert("sorry, error when use ajax!!!!");
        }
    });

    return false;
});*/
$('.form-add-ct').submit(function(){
    var email   = $('.form-add-ct input[name="email"]').val();
    
    $.ajax({
        type:"POST",
        url:href_base+"/send-email-customer",
        beforeSend: function (xhr) {
            var token = $('meta[name="csrf_token"]').attr('content');
            if (token) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', token);
            }
        },
        data:{name: name, email: email},
        dataType:'json',
        success:function(kq){
            if(kq == '1'){
                //complete.
                $('.tb-1').removeClass('hidden');
                setTimeout(function(){
                    $('.tb-1').addClass('hidden');
                    magnificPopup.close(); 
                },1500);

                $('.form-add-ct input[name="name"]').val('');
                $('.form-add-ct input[name="email"]').val('');

            }else{
                if(kq == 2){
                    $('.tb-2').removeClass('hidden');
                    setTimeout(function(){
                        $('.tb-2').addClass('hidden');
                    },2000);
                    $('.form-add-ct input[name="email"]').val('');
                }else{
                    // false.
                    $('.tb-3').removeClass('hidden');
                    setTimeout(function(){
                        $('.tb-3').addClass('hidden');
                    },2000);
                }
            }
        },
        error:function(){
        }
    });

    return false;
});