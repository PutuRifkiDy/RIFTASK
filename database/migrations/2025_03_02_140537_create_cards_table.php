<?php

use App\Enums\CardStatus;
use App\Enums\CardPriority;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('workspace_id')->constrained('workspaces')->cascadeOnDelete();
            $table->string('title');
            $table->string('description')->nullable();
            $table->date('deadline')->nullable();
            $table->unsignedInteger('order');
            $table->string('status')->default(CardStatus::TODO->value);
            $table->string('priority')->default(CardPriority::UNKNOWN->value);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
