<?php

namespace App\Http\Controllers;

use App\Http\Resources\MyTaskResource;
use App\Models\Card;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Response;

class MyTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $task = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable', Card::class)
            ->get();

        return inertia(component: 'Task/Index', props: [
            'tasks' => fn() => MyTaskResource::collection($task),
            'page_settings' => [
                'title' => 'My Task',
                'subtitle' => 'A list of all the task in your platform',
            ],
        ]);

    }
}
