<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResponseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('response', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('idMowerer')->unsigned();
            $table->bigInteger('idMowered')->unsigned();
            $table->bigInteger('idAdvert')->unsigned();
            $table->foreign('idMowerer')->references('id')->on('users');
            $table->foreign('idMowered')->references('id')->on('users');
            $table->foreign('idAdvert')->references('id')->on('advert');
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
        Schema::dropIfExists('response');
    }
}
