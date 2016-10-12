<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\User;
use Validator;
use Auth;
use Hash;
use App\Http\Controllers\Controller;
use App\Http\Requests;

class AdminController extends Controller{
    public function __construct(){
    }

    public function index(){
        return view('welcome');;
        
    }

    // view change pass.
    public function changePass(){
    	return view('admin.auth.change_pass');
    }

    // Ajax check change pass.
    public function changePassProcess(Request $request){
        if (Hash::check($request->password, Auth::user()->password)){
            $user = Auth::user();
            $user->password = bcrypt($request->newpass);
            $user->save();
            return 1;
        }else{
            // password cu nhap sai.
            return 0;
        }
    }

}