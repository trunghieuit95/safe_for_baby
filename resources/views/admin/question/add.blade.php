@extends('admin.layout.master')

@section('title')
	Safe for Baby | Thêm câu hỏi
@stop

@section('right-content')
    <div class="right-header-wp">
        <div class="right-header">
            <div class="left-h pull-left">
                <i class="fa fa-plus"></i><span>Thêm mới câu hỏi</span>
            </div>

            <div class="right-h pull-right">
                <a class="btn-back" href="<?php if(@$_SERVER['HTTP_REFERER']) echo $_SERVER['HTTP_REFERER']; else echo route('admin.questions.index')?>">Hủy</a>

                <span class="btn-add" onclick="$('.sb-my-form-add').click();">Lưu</span>
            </div>
        </div>
    </div>

    <div class="right-box">
        <form class="form-horizontal" id="form-add" role="form" enctype="multipart/form-data" method="post" action="{{ route('admin.questions.store') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="left-form style-1">
                <div class="item-left-form">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Tên Ảnh<span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name" required="">
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Danh mục <span class="node-req">*</span></label>
                        <div class="col-sm-4">
                            <span class="ui-select">
                                <select required="" name="cate_id" class="none-user" id="cate_id">
                                    <option value="">--</option>
                                    @foreach($cate as $item)
                                    <option value="{{$item->id}}">{{$item->name}}</option>
                                    @endforeach
                                </select>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Kết quả<span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="link_explain" required="">
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Đáp án <span class="node-req">*</span></label>
                        <div class="col-sm-4">
                            <span class="ui-select">
                                <select required="" name="result" class="none-user">
                                    <option value="">---</option>
                                    <option value="0">Đúng</option>
                                    <option value="1">Sai</option>
                                </select>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Ảnh<span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="link_image" required="">
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>
                </div>

            </div>
            
            <div class="right-form style-1">
                <div class="item-right-form item-note">
                    <div class="form-group ">
                        <label for="inputEmail3" class="col-xs-12 control-label">Chú ý :</label>
                        <p>Trường có dấu <span class="node-req">*</span> là bắt buộc, vui lòng điền đầy đủ !</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
@stop