<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    // protected $middleware = [
    //     \App\Http\Middleware\EncryptCookies::class,
    //     \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    //     \Illuminate\Session\Middleware\StartSession::class,
    //     \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    //     \App\Http\Middleware\VerifyCsrfToken::class,
    //     \Illuminate\Routing\Middleware\SubstituteBindings::class,
    // ];

    protected $middleware = [
        // middleware toàn cục
        \App\Http\Middleware\VerifyCsrfToken::class,
    ];

    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\VerifyCsrfToken::class,
        ],

        'admin' => \App\Http\Middleware\AdminOnly::class,

        'api' => [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'appearance' => \App\Http\Middleware\HandleAppearance::class,
    ];

    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        // Thêm middleware khác tại đây
    ];
}