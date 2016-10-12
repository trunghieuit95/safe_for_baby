@extends('admin.layout.master')

@section('title')
	Safe for Baby | Danh sách nội dung
@stop

@section('right-content')
    <div class="right-header-wp">
        <div class="right-header">
            <div class="left-h pull-left">
                <i class="fa fa-book"></i><span>Danh sách nội dung</span>
            </div>

            <div class="right-h pull-right">
                <span class="btn-import btn-import-left hidden">Export</span>
                <span class="btn-import btn-import-right hidden" data-toggle="modal" data-target="#myModal-import">Import</span>

                <a class="btn-add" href="{{route('admin.books.create')}}">Thêm</a>
            </div>
        </div>
    </div>

    <div class="right-box">
        <div class="content-right-box">
            <p class="header-table hidden"><span class="fa fa-th-list"></span> title box</p>
            
            <div class="data-table-wp">
                <table id="dataTable-new" class="my-table table table-bordered table-condensed table-hover table-striped responsive " width="100%" >
                    <thead>
                        <tr>
                            <td style="max-width: 100px">STT <span class="fa fa-caret-up"></span><span class="fa fa-caret-down"></span></td>
                            <td class="text-center">Tên <span class="fa fa-caret-up"></span><span class="fa fa-caret-down"></span></td>
                            <td class="text-center">Ảnh bìa <span class="fa fa-caret-up"></span><span class="fa fa-caret-down"></span></td>
                            <td class="text-center">Mục <span class="fa fa-caret-up"></span><span class="fa fa-caret-down"></span></td>
                            <td style="max-width: 200px" class="view-center">Thao tác</td>
                        </tr>
                    </thead>
                    <tbody>
                    <?php $i = 1;foreach($list as $item){ ?>
                        <tr>
                            <td><?=$i?></td>
                            <td class="text-center"><a href="{{ asset('/admin/questions/'.$item->id.'/edit') }}" target="_blank">{{ $item->name }}</a></td>
                            <td class="text-center"><img src="{{$item->img}}" alt="" style="width: 150px"></td>
                            <td class="text-center">{{ $item->id_category}}</td>
                            <td class="text-center" style="min-width: 100px">
                                <a  href="{{ asset('/admin/books/'.$item->id.'/edit') }}" class="btn btn-xs btn-info">Sửa</a>
                                <form method="POST" action="{!! route('admin.books.destroy',$item->id) !!}" style="display: inline;" >
                                    <input type="hidden" name="_method" value="DELETE">
                                    <input type="hidden" name="_token" value="{{ csrf_token() }}">

                                    <button class="btn btn-xs btn-danger" style="outline: none" onclick="return confirm('Are you delete?');">Xóa</button>
                                </form>
                            </td>

                        </tr>
                        <?php $i++;}?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('assets/js/jquery.dataTables.js')}}"></script>
    <script type="text/javascript" src="{{ asset('assets/js/DT_bootstrap.js')}}"></script>
    <script type="text/javascript" src="{{ asset('assets/js/jquery.tablesorter.min.js')}}"></script>

    <script type="text/javascript">
    $(document).ready(function(){
        metisTable();
    });
    </script>

@stop