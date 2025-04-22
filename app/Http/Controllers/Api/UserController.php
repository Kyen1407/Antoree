<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }
    
    // Phương thức đăng ký
    public function register(Request $request)
    {
        // Xác thực dữ liệu
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Nếu có lỗi
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Tạo người dùng mới
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Mã hóa mật khẩu
        ]);

        return response()->json(['user' => $user], 201);
    }

    // Phương thức đăng nhập
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['user' => $user], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Phương thức lấy thông tin người dùng
    public function getUser(Request $request)
    {
        return response()->json($request->user(), 200);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $id,
        ]);
    
        $user = User::findOrFail($id);
    
        $user->fill($validated);
    
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
    
        $user->save();
    
        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted.']);
    }

}
