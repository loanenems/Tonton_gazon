<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLawnmowerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lawnmower', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('idGarden')->unsigned();
            $table->foreign('idGarden')->references('id')->on('garden');
            $table->string('name');
            $table->string('photo');
            $table->string('type');
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
        Schema::dropIfExists('lawnmower');
    }
}
