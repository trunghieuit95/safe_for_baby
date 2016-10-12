<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use Response;
use App\Category;
//use App\APIException\ErrorParameterException;

class CategoryController extends Controller{
    // CONST DEFAULT_LIMIT = 30;
    // CONST DEFAULT_OFFSET = 0;
    
    // get list topic by category.
    public function index(){
        return Category::all();
    }
}