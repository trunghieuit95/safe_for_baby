@extends('admin.layout.master')

@section('title')
	Safe for Baby | Sửa danh mục
@stop

@section('right-content')
    <div class="right-header-wp">
        <div class="right-header">
            <div class="left-h pull-left">
                <i class="fa fa-edit"></i><span>Sửa</span>
            </div>

            <div class="right-h pull-right">
                <a class="btn-back" href="<?php if(@$_SERVER['HTTP_REFERER']) echo $_SERVER['HTTP_REFERER']; else echo route('admin.categories.index')?>">Hủy</a>

                <span class="btn-add" onclick="$('.sb-my-form-add').click();">Lưu</span>
            </div>
        </div>
    </div>

    <div class="right-box">
        <form class="form-horizontal" id="form-add" role="form" enctype="multipart/form-data" method="post" action="{{ route('admin.categories.update',$detail->id) }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="_method" value="PUT">
            <div class="left-form style-1">
                <div class="item-left-form">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Tên Ảnh<span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name" required="" value="{!! $detail->name !!}" >
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Link ảnh <span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="img" required="" value="{!! $detail->img !!}" >
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>
                    <div class="form-group">
	                    <label for="inputEmail3" class="col-sm-3 control-label">Ảnh hiện tại <span class="node-req">*</span></label>
	                        <div class="col-sm-8">
	                            <img src="{!! $detail->img !!}">
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