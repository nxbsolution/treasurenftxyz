import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const config = {
  protectedPaths: ['/dashboard', "/register"], // '/admin'
  loginPath: '/login',
  // logoutPath: '/logout',
  defaultPath: '/',
  apiMeEndpoint: '/api/users/me',
}

type User = {
  roles?: string[]
}

const isProtectedPath = (path: string): boolean =>
  config.protectedPaths.some(protectedPath => path.startsWith(protectedPath))

const getAllowedPaths = (user: User): string[] => {
  if (user?.roles?.includes("superadmin") || user?.roles?.includes("admin")) {
    return config.protectedPaths
  }
  return config.protectedPaths.filter((path) => path !== "/admin")
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle login path only
  if (pathname === config.loginPath) {
    const response = await fetch(`${request.nextUrl.origin}${config.apiMeEndpoint}`, {
      headers: {
        Cookie: request.headers.get('Cookie') || '',
      },
    })

    if (response.ok) {
      const { user } = await response.json()
      if (user) {
        const allowedPaths = getAllowedPaths(user)
        const primaryPath = allowedPaths[0] || config.defaultPath
        return NextResponse.redirect(new URL(primaryPath, request.url))
      }
    }
    return NextResponse.next()
  }

  // If the path is not protected, allow access
  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  // Fetch user data for protected paths
  const response = await fetch(`${request.nextUrl.origin}${config.apiMeEndpoint}`, {
    headers: {
      Cookie: request.headers.get('Cookie') || '',
    },
  })

  if (!response.ok || !response) {
    return NextResponse.redirect(new URL(config.loginPath, request.url))
  }

  const { user } = await response.json()
  if (!user) {
    return NextResponse.redirect(new URL(config.loginPath, request.url))
  }

  const allowedPaths = getAllowedPaths(user)
  if (!allowedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(allowedPaths[0] || config.defaultPath, request.url))
  }

  return NextResponse.next()
}

export const Matcherconfig = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
