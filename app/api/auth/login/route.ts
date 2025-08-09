import { NextResponse } from 'next/server';

interface ErrorResponse {
  detail?: string;
}

interface LoginSuccessResponse {
  access_token: string;
  token_type: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as { email: string; password: string };

  try {
    const response = await fetch(`${BACKEND_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    });

    if (!response.ok) {
      const errorData: unknown = await response.json();
      let errorMessage = 'Login failed';
      if (typeof errorData === 'object' && errorData !== null && 'detail' in errorData) {
        errorMessage = (errorData as ErrorResponse).detail || errorMessage;
      }
      return NextResponse.json({ message: errorMessage }, { status: response.status });
    }

    const data = (await response.json()) as LoginSuccessResponse;
    const { access_token } = data;

    const nextResponse = NextResponse.json({ message: 'Login successful' });

    // Set the token in an httpOnly cookie
    nextResponse.cookies.set('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return nextResponse;
  } catch (error: unknown) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}