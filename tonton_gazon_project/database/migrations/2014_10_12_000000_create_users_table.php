<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('primary_role')->nullable($value = true); //Ex: tondeur, tondu
            $table->string('secondary_role')->nullable($value = true); //Ex: Admin, ancien, fondateur...
            $table->integer('xp')->default(0);
            $table->string('name')->nullable($value = true);
            $table->string('surname')->nullable($value = true);
            $table->date('birthday')->nullable($value = true);
            $table->longText('address')->nullable($value = true);
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable($value = true);
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
        Schema::dropIfExists('users');
    }
}
