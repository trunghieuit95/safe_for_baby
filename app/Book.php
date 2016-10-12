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

class Book extends Model {
    protected $fillable = [
    	'id',
    	'id_category',
        'name',
        'img',
        'content'
    ];
    protected $dateFormat = 'U';
    protected $table = 'books';
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