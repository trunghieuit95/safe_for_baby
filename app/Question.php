<?php
/**
 * Sound Model
 * @package Sound.php
 * @author HoangTran
 */
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Carbon\Carbon;
use App;

class Question extends Model {
    protected $fillable = [
        'name_image',
        'id_category',
        'result',
        'link_image',
        'link_explain'
    ];
    protected $dateFormat = 'U';
    protected $table = 'products';
    protected $createRules = [
        //'icon'  => 'required|email|unique:users,id,:id',
    ];

    protected $updateRules = [
        'latest_accessed_at' => 'date'
    ];
    protected $hidden     = ['deleted_at','created_at', 'updated_at'];
    protected static function boot(){
        parent::boot();
    }
}