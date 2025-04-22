<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra nếu người dùng là admin
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        // Nếu không phải admin, chuyển hướng về trang dashboard của người dùng
        return redirect()->route('dashboard');
    }
}

