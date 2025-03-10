<?php
namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MemberCardController extends Controller
{
    public function member_store(Card $card, Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'string'],
        ]);

        $user = User::query()
            ->where('email', $request->email)
            ->first();

        if (! $user) {
            flashMessage('Unregistered user', 'error');
            return back();
        }

        if ($card->members()->where('user_id', $user->id)->exists())
        {
            flashMessage('User already a member of this card', 'error');
            return back();
        }

        $card->members()->create([
            'user_id' => $user->id,
            'role' => 'Member',
        ]);

        flashMessage('Member added successfully');
        return back();

    }

    public function member_destroy(Card $card, Member $member): RedirectResponse
    {
        $member->delete();

        flashMessage('Member removed successfully');

        return back();
    }
}
