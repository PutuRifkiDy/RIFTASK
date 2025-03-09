<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'min:3', 'max:255', 'alpha_dash', Rule::unique('users')->ignore($this->user)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($this->user)],
            'avatar' => ['nullable', 'mimes:png,jpg,jpeg', 'max:2048'],
        ];

        // Validasi password khusus saat membuat user baru
        if ($this->routeIs('users.store')) {
            $rules['password'] = ['required', 'min:8', 'max:255', 'confirmed'];
        }

        // Validasi password saat update (opsional, hanya diubah jika diisi)
        if ($this->routeIs('users.update')) {
            $rules['password'] = ['nullable', 'min:8', 'max:255', 'confirmed'];
        }

        return $rules;
    }

    public function attributes(): array
    {
        return [
            'name' => 'Name',
            'username' => 'Username',
            'email' => 'Email',
            'password' => 'Password',
            'avatar' => 'Avatar',
        ];
    }
}
