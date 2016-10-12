<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests;
use App\Question;
use App\Category;
class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [
            'list' => Question::select('products.*')
                    ->get()
        ];
        //echo $user->id;
        return view('admin.question.index', $data);
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
        return view('admin.question.add',$data);
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
            'name_image'         => $request->name,
            'id_category'      => $request->cate_id,
            'result'         => $request->result,
            'link_image'      => $request->link_image,
            'link_explain'         => $request->link_explain
        ];

        $sound = Question::create($data);
        return redirect()->route('admin.questions.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $detail = Question::find((int)$id);
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
        return view('admin.question.edit',$data,$data2);
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
        $detail = Question::find($id);
        if(!$detail){
            abort(404);
        }
        $data = [
            'name_image'         => $request->name,
            'id_category'      => $request->cate_id,
            'result'         => $request->result,
            'link_image'      => $request->link_image,
            'link_explain'         => $request->link_explain
        ];
        $detail->update($data);
        return redirect()->route('admin.questions.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Question::destroy($id);
        return redirect()->route('admin.questions.index');
    }
}
