<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf_token" content="{{ csrf_token() }}" />
	<title>@yield('title')</title>
	<link rel="icon" href="{{ asset('favicon.ico')}}" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="{{ asset('assets/font-awesome-4.4.0/css/font-awesome.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/admin_main.css') }}">
	<script type="text/javascript" src="{{ asset('assets/js/jquery-2.1.1.min.js')}}"></script>
	<script type="text/javascript" src="{{ asset('assets/js/bootstrap.min.js')}}"></script>
</head>
<body>
	<div class="content-page container-fluid">
		<!-- div left-menu -->
		<div class="left-menu">
			@include('admin.layout.nav')
		</div><!-- end div left-menu -->

		<!-- div right-content -->
		<div class="right-content">
			@yield('right-content')
		</div><!-- end div right-content -->
	</div>
	<script src="{{ asset('assets/js/myjs.js')}}" type="text/javascript"></script>
</body>
</html>