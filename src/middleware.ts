import next from 'next'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Configuration
// This line is just to generate a new commit
const config = {
  protectedPaths: ['/admin', '/dashboard', "/signup/register"],
  loginPath: '/login',
  logoutPath: '/logout',
  defaultPath: '/',
  apiMeEndpoint: '/api/users/me',
}

// Types
type AllowedPath = {
  path: string
}


type User = {
  roles?: string[]
}

// Utility functions
const isProtectedPath = (path: string): boolean =>
  config.protectedPaths.some(protectedPath => path.startsWith(protectedPath))

const getAllowedPaths = (user: User): string[] => {
  if (user?.roles?.includes("superadmin") || user?.roles?.includes("admin")) {
    return ['/admin', '/dashboard']
  }
  return ['/dashboard', '/signup/register']
}

const isAllowedPath = (requestedPath: string, allowedPaths: string[]): boolean => {
  return allowedPaths.some(allowedPath => {
    // Exact match
    if (requestedPath === allowedPath) return true

    // Check if the requested path starts with the allowed path
    if (requestedPath.startsWith(allowedPath)) {
      // Ensure it's a complete path segment match
      const remainingPath = requestedPath.slice(allowedPath.length)
      return remainingPath === '' || remainingPath.startsWith('/')
    }

    return false
  })
}

// Middleware
export async function middleware(request: NextRequest) {
  // return NextResponse.next()
  const { pathname } = request.nextUrl

  // Handle login and logout paths
  if (pathname === config.loginPath || pathname === config.logoutPath) {
    try {
      const response = await fetch(`${request.nextUrl.origin}${config.apiMeEndpoint}`, {
        headers: {
          Cookie: request.headers.get('Cookie') || '',
        },

      })
      if (response.ok) {
        const { user } = await response.json()
        if (user) {
          // User is logged in
          if (pathname === config.loginPath) {
            // Redirect to primary path if trying to access login page while logged in
            const allowedPaths = getAllowedPaths(user)
            const primaryPath = allowedPaths.length > 0 ? allowedPaths[0] : config.defaultPath
            return NextResponse.redirect(new URL(primaryPath, request.url))
          }
          // Allow access to logout page
          return NextResponse.next()
        }
      }

      // User is not logged in
      if (pathname === config.logoutPath) {
        // Redirect to login page if trying to access logout page while not logged in
        return NextResponse.redirect(new URL(config.loginPath, request.url))
      }
      // Allow access to login page
      return NextResponse.next()
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.next()
    }
  }

  // If the path is not protected, allow access
  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  try {
    // Fetch user data
    const response = await fetch(`${request.nextUrl.origin}${config.apiMeEndpoint}`, {
      headers: {
        Cookie: request.headers.get('Cookie') || '',
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch user data: ${response.status} ${response.statusText}`)
      return NextResponse.redirect(new URL(config.loginPath, request.url))
    }

    const { user } = await response.json()

    if (!user) {
      console.log('No user found, redirecting to login')
      return NextResponse.redirect(new URL(config.loginPath, request.url))
    }

    const allowedPaths = getAllowedPaths(user)
    console.log(`User allowed paths: ${JSON.stringify(allowedPaths)}`)
    console.log(`Requested path: ${pathname}`)

    if (!isAllowedPath(pathname, allowedPaths)) {
      console.log(`User attempted to access unauthorized path ${pathname}`)
      if (allowedPaths.length > 0) {
        const primaryPath = allowedPaths[0]
        console.log(`Redirecting to primary allowed path: ${primaryPath}`)
        return NextResponse.redirect(new URL(primaryPath, request.url))
      } else {
        console.log('User has no allowed paths, redirecting to default path')
        return NextResponse.redirect(new URL(config.defaultPath, request.url))
      }
    }

    console.log(`Access granted to ${pathname}`)
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL(config.loginPath, request.url))
  }
}

// Matcher configuration
export const Matcherconfig = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

