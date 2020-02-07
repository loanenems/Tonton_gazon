<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGardenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garden', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('idOwner')->unsigned();
            $table->foreign('idOwner')->references('id')->on('users');
            $table->longText('description');
            $table->integer('size');
            $table->longText('movableObstacle'); //List of movable obstacles. Format: {count:2, list:{type:"table",type:"chaise"}}
            $table->longText('unmovableObstacle'); //List of unmovable obstacles. Format: {count:2, list:{type:"arbre",type:"rocher"}}
            $table->longText('pets'); //List of pets. Format: {count:2, list:{type:"chat",type:"chien"}}
            $table->boolean('equipment'); //Own one/few lawnmower(s) ? if so, check lawnmower table for match
            $table->longText('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('garden');
    }
}
