<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Card;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Redirect;

class TaskController extends Controller
{
    public function store(Card $card, TaskRequest $request): RedirectResponse
    {
        $request->user()->tasks()->create([
            'card_id' => $card->id,
            'title' => $request->title,
        ]);

        flashMessage('Task added successfully');

        return back();
    }

    public function destroy(Card $card, Task $task): RedirectResponse
    {
        $task->delete();

        flashMessage('Task deleted successfully');

        return back();
    }
}
