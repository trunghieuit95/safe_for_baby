<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
/*
|--------------------------------------------------------------------------------
| Web routes
|--------------------------------------------------------------------------------
|
*/
Route::group(['namespace' => 'Web', 'as' => 'web::'],function (){
	// home
	Route::get('/', ['as'	=> 'home', 'uses'	=> 'HomeController@index']);
});

/*
|--------------------------------------------------------------------------------
| Api routes
|--------------------------------------------------------------------------------
|
*/
Route::group(['namespace'=>'Api', 'prefix'=>'api', 'middleware'=>['api','log'] ],function (){
	Route::resource('books', 'BookController',[
		'only' => ['index']
	]);
	Route::resource('questions', 'QuestionController',[
		'only' => ['index']
	]);
	Route::resource('categories', 'CategoryController',[
		'only' => ['index']
	]);
	// Route::resource('galleries', 'GalleryController',[
	// 	'only' => ['index']
	// ]);

	//Route::get('advertises', 'AdvertiseController@index');
	//return (die('x'));
});

/*
|---------------------------------------------------------------------------------
| Admin routes
|---------------------------------------------------------------------------------
|
*/
Route::group(['namespace'=>'Admin','prefix'=>'admin'],function (){

	Route::group(['namespace'=>'Auth'],function (){
		Route::get('login',[
			'as'	=> 'admin.login', 'uses'	=> 'AuthController@login'
		]);
		Route::post('login','AuthController@postLogin');
	});

	Route::group(['middleware'=>'admin'],function (){
		Route::get('/', [
			'as'	=> 'admin.home', 'uses'	=> 'AdminController@index'
		]);

		// auth-admin setting -------------------------------------------
		Route::get('logout','Auth\AuthController@getLogout');
		Route::get('/change-pass', [
			'as'	=> 'admin.changePass', 'uses' => 'AdminController@changePass'
		]);
		Route::post('/change-pass', [
			'as'	=> 'admin.changePassProcess', 'uses' => 'AdminController@changePassProcess'
		]);
	Route::resource('questions', 'QuestionController',[
			'only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']
		]);
	Route::resource('categories', 'CategoryController',[
			'only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']
		]);
	Route::resource('books', 'BookController',[
			'only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']
		]);

});
});