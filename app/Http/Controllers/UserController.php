<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'avatar', 'created_at'])
            ->when(request()->search, function ($query, $value) {
                $query->whereAny([
                    'name',
                    'username',
                    'email'
                ], 'REGEXP', $value);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia(component: 'Users/Index', props: [
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'has_page' => $users->hasPages(),
                ],
            ]),
            'page_settings' => [
                'title'    => 'Users',
                'subtitle' => 'A list of all the people in your platform',
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? " ",
            ],
        ]);
    }
}
