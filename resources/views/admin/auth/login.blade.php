@extends('admin.auth.master')

@section('title')
	LH2 Team | Login
@stop

@section('page-content')
<!-- div page-content -->
<div class="page-content-wp">
	
	<div class="container-fluid">
		<div class="box-login-wp">
			<div class="box-login">
				<h3 class="title">LH2 Team</h3>
				<form method="post" action="{{ url('admin/login') }}" class="form-login">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<div class="form-div-1">
						<input type="email" name="email" placeholder="Email" class="full-size" required>
					</div>
					
					<div class="form-div-1">
						<input type="password" name="password" placeholder="Password" class="full-size" required>
					</div>
	
					<div class="form-div-1">
						<input type="checkbox" name="remember_pass"> Ghi nhớ
					</div>

					<button class="submit" type="submit" onclick="$('.form-login').submid()">Đăng nhập</button>
				</form>
			</div>
		</div>
	</div>
</div><!-- end div page-content-->
@stop