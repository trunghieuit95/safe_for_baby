@extends('admin.layout.master')

@section('title')
	Safe for Baby | Chỉnh sửa nội dung
@stop

@section('right-content')
    <div class="right-header-wp">
        <div class="right-header">
            <div class="left-h pull-left">
                <i class="fa fa-edit"></i><span>Chỉnh sửa nội dung</span>
            </div>

            <div class="right-h pull-right">
                <a class="btn-back" href="<?php if(@$_SERVER['HTTP_REFERER']) echo $_SERVER['HTTP_REFERER']; else echo route('admin.books.index')?>">Hủy</a>

                <span class="btn-add" onclick="$('.sb-my-form-add').click();">Lưu</span>
            </div>
        </div>
    </div>

    <div class="right-box">
        <form class="form-horizontal" id="form-add" role="form" enctype="multipart/form-data" method="post" action="{{ route('admin.books.update',$detail->id) }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="_method" value="PUT">
            <div class="left-form style-1">
                <div class="item-left-form">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Tên <span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="name" required="" value="{!! $detail->name !!}">
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Danh mục <span class="node-req">*</span></label>
                        <div class="col-sm-4">
                            <span class="ui-select">
                                <select required="" name="id_category" class="none-user" id="cate_id">
                                    <option value="">--</option>
                                    @foreach($cate as $item)
                                    <option value="{{$item->id}}" <?php if($detail->id_category == $item->id ) echo 'selected' ?>>
                                    {{$item->name}}</option>
                                    @endforeach
                                </select>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Ảnh<span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" name="img" required="" value="{!! $detail->img !!}">
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">Nội dung<span class="node-req">*</span></label>
                        <div class="col-sm-8">
                            <TEXTAREA type="text" class="form-control" name="content" required="">{!! $detail->content !!}</TEXTAREA> 
                            <input type="submit" class="hidden sb-my-form-add">
                        </div>
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