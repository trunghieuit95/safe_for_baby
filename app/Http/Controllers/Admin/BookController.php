<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests;
use App\Book;
use App\Category;
class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [
            'list' => Book::select('books.*')
                    ->get()
        ];
        //echo $user->id;
        return view('admin.book.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = array(
            'cate' => Category::all()
        );
        return view('admin.book.add',$data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [
        	'id_category' => $request->id_category,
            'name'         => $request->name,
            'img'      => $request->img,
            'content' => $request->content
        ];
        $sound = Book::create($data);
        return redirect()->route('admin.books.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $detail = Book::find((int)$id);
        if(!$detail){
            abort(404);
        }
        $data = [
            'detail' => $detail
        ];
        $data2 = array(
            'cate' => Category::all()
        );
        //return view('admin.question.edit',$detail);
        return view('admin.book.edit',$data,$data2);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $detail = Book::find($id);
        if(!$detail){
            abort(404);
        }
        $data = [
            'id_category' => $request->id_category,
            'name'         => $request->name,
            'img'      => $request->img,
            'content' => $request->content
        ];
        $detail->update($data);
        return redirect()->route('admin.books.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    	Book::destroy($id);
    	return redirect()->route('admin.books.index');
    }
}
