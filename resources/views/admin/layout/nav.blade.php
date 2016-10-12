<ul class="box-left">
	<a class="home-page">
		<img src="{{ asset('assets/images/admin/logo.png')}}" alt="icon">
        <h3>LH2 Team</h3>
	</a>
	<li class="li-rd-page" >
        <li class="li-rd-page" >
        <a href="{{ url('/admin') }}"><i class="fa fa-home" ></i><span>Trang chủ</span></a>
    </li>
    <li class="li-rd-page" >
        <li class="li-rd-page" >
        <a href="{{ route('admin.categories.index') }}"><i class="fa fa-navicon" ></i><span>Danh mục</span></a>
    </li>
    <li class="li-rd-page" >
        <li class="li-rd-page" >
        <a href="{{ route('admin.questions.index') }}"><i class="fa fa-question" ></i><span>Câu hỏi</span></a>
    </li>
    <li class="li-rd-page" >
        <li class="li-rd-page" >
        <a href="{{ route('admin.books.index') }}"><i class="fa fa-book" ></i><span>Sách</span></a>
    </li>
	<li class="next-nav__item--flex-spacer"></li>
<!-- 		<div class="parent-box-admin">
		    <div class="wp-content-box-admin"style="transform-origin: 82px calc(100% + 5px) 0px;">
		        <ul class="content-box-admin">
		            <li class="">
		                <a href="{!! route('admin.changePass') !!}">
		                    <i class="fa fa-key"></i>Change password
		                </a>
		            </li>
		            <hr>
		            <li>
		                <a href="{!! url('admin/logout') !!}">
		                    <i class="fa fa-power-off"></i>Log Out
		                </a>
		            </li>
		        </ul>
		    </div>
		</div> -->
<!-- 		<a href="{!! url('admin/logout') !!}" class="content-box-admin">
			<i class="fa fa-power-off"></i>
			<span class="sp2">Đăng xuất</span>
		</a> -->
		<a class="home-page" href="{!! url('admin/logout') !!}">
        <h4><i class="fa fa-power-off"></i> Đăng xuất</h4>
		</a>
</ul>