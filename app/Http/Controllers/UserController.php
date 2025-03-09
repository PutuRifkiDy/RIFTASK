<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\HasFile;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    use HasFile;
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

    public function create(): Response
    {
        return inertia(component: 'Users/Create', props: [
            'page_settings' => [
                'title'    => 'Create User',
                'subtitle' => 'Fill out this form to add a new user',
                'method'   => 'POST',
                'action'   => route('users.store'),
            ],
        ]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'avatar' => $this->upload_file($request, 'avatar', 'users'),
        ]);

        flashMessage('User created successfully');

        return to_route('users.index');
    }
}
