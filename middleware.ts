import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// In a real application, you would import jwt
// import jwt from 'jsonwebtoken';

// This should be in your environment variables in a real app
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Fallback for development

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const protectedPaths = ['/admin']; // Paths that require authentication

  // Check if the current path starts with any protected path
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (!isProtectedPath) {
    return NextResponse.next(); // Allow access to non-protected paths
  }

  if (!token) {
    // No token, redirect to login page
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // Simulate JWT verification
  let isValidToken = false;
  let decodedToken: any = null;

  // In a real app:
  // try {
  //   decodedToken = jwt.verify(token, JWT_SECRET);
  //   isValidToken = true;
  // } catch (error) {
  //   console.error('JWT verification failed:', error);
  //   isValidToken = false;
  // }

  // Simplified simulation: check if it's our simulated token
  if (token.startsWith('simulated_jwt_for_')) {
    isValidToken = true;
    // Extract simulated data for multi-tenant check later if needed
    const parts = token.split('_');
    decodedToken = {
      userId: parts[3],
      role: parts[5],
      ormawaId: parts[7],
    };
  }

  if (!isValidToken) {
    // Invalid token, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  // If token is valid, allow the request to proceed
  // You can also attach decodedToken to the request headers for downstream use if needed
  // For example: request.headers.set('x-user-id', decodedToken.userId);
  // For multi-tenant, you might check decodedToken.ormawaId against the URL slug here
  // if (request.nextUrl.pathname.startsWith('/admin/') && decodedToken.ormawaId !== request.nextUrl.pathname.split('/')[2]) {
  //   return NextResponse.redirect(new URL('/403', request.url)); // Forbidden
  // }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'], // Apply middleware to all /admin and /api/admin routes
};