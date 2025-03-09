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
        $tasks = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable', Card::class)
            ->when(request()->search, function ($query, $value) {
                return $query->whereHasMorph('memberable', Card::class, function ($subQuery) use ($value) {
                    $subQuery
                        ->where('title', 'REGEXP', $value)
                        ->orWhere('description', 'REGEXP', $value)
                        ->orWhere('status', 'REGEXP', $value)
                        ->orWhere('created_at', 'REGEXP', $value);
                });
            })
            ->paginate(request()->load ?? 10);

        return inertia(component: 'Task/Index', props: [
            'tasks'         => fn()         => MyTaskResource::collection($tasks)->additional(
                [
                    'meta' => [
                        'has_page' => $tasks->hasPages(),
                    ],
                ]
            ),
            'page_settings' => [
                'title'    => 'My Task',
                'subtitle' => 'A list of all the task in your platform',
            ],
            'state'         => [
                'page'   => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load'   => 10,
            ],
        ]);

    }
}
