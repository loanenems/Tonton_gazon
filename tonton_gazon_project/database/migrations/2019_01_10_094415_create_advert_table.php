<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advert', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('idAuthor')->unsigned();
            $table->bigInteger('idGarden')->unsigned();
            $table->foreign('idAuthor')->references('id')->on('users');
            $table->foreign('idGarden')->references('id')->on('garden');
            $table->string('title');
            $table->longText('description');
            $table->float('payout');
            $table->tinyInteger('state')->default(0);
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
        Schema::dropIfExists('advert');
    }
}
