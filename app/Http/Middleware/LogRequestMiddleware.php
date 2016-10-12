<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\APIException\ErrorParameterException;
use App\User;

class LogRequestMiddleware {

    public function handle($request, Closure $next)
    {
        $token = $request->header('P-Bebeboo-api-token');

        /*if (empty($token)) {
            $user = 'unknown';
            $token = 'unknown';
        } else {
            $user = User::findByToken($token);
            $user = empty($user) ? 'unknown' : $user->id;
            $token = substr($token, 0, 4) . "..." . substr($token, -4, 4);
        }*/
        $user = 'unknown';
        $token = 'unknown';

        \Log::info(sprintf("[TOKEN:%s][USER:%s] REQUEST: %s %s %s", $token, $user, $request->method(), $request->path(), json_encode($request->input())));
        //\Log::info(sprintf("[TOKEN:%s][USER:%s] REQUEST: %s %s %s", $token, $user, $request->method(),$request->header('Content-Type'), $request->path(), json_encode($request->input())));
        //$request->header('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary9qEfkrXWAXbAMQBr');
        //throw new ErrorParameterException([],$request->header('Content-Type'));

        $response = $next($request);

        if ($response instanceof BinaryFileResponse) {
            return $response;
        }
        \Log::info(sprintf("[TOKEN:%s][USER:%s] RESPONSE: %s %s", $token, $user, $response->status(), $response->getContent()));

        return $response;
    }
}

