<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use Response;
use App\Book;
//use App\APIException\ErrorParameterException;

class BookController extends Controller{
    CONST DEFAULT_LIMIT = 30;
    CONST DEFAULT_OFFSET = 0;
    
    // get list topic by category.
    public function index(Request $request){
        if(!$request->cate_id){
            //throw new ErrorParameterException([],'cate_id is require !');
            return ('k tim thay id');
        }
		//die('x');
        $limit  = is_null($request->limit) ? BookController::DEFAULT_LIMIT : (int)$request->limit ;
        $offset = is_null($request->offset) ? BookController::DEFAULT_OFFSET : (int)$request->offset ;

        $data = Book::where([
                        'id_category' => (int)$request->cate_id
                    ])
                    ->skip($offset)
                    ->take($limit)
                    ->get();

        // foreach ($data as $item) {
        //     $item->lyric = html_entity_decode($item->lyric);
        //     $item->lyric = str_replace('&#39;',"'",$item->lyric);
        //     $item->lyric = str_replace('\\n',"\n",$item->lyric);

        //    // $item->sounds = Link::where(['sound_id' => $item->id])->get();
        // }
        //return ($request->cate_id);
        return [
            'data'      => $data,
            'limit'     => $limit,
            'offset'    => $offset + count($data)
        ];
    }
}