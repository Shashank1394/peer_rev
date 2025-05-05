import NextAuth from "next-auth";
import authConfig from "./auth.config.base";
import { privateRoutes } from "./routes";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const url = "http://localhost:3000";

  const pathname = nextUrl.pathname;

  const isAuthRoute = pathname.startsWith("/auth");
  const isApiRoute = pathname.startsWith("/api");
  const isAdminRoute = pathname.startsWith("/admin");
  const isFacultyRoute = pathname.startsWith("/faculty");
  const isPrivateRoute = privateRoutes.includes(pathname);
  const isHomeRoute = pathname === "/";

  if (isApiRoute) return;

  // Redirect logged-in users away from login/register pages
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/dashboard`);
  }

  // Redirect logged-in users away from home page
  if (isLoggedIn && isHomeRoute) {
    return Response.redirect(`${url}/dashboard`);
  }

  // Redirect guests away from protected or admin routes
  if (!isLoggedIn && (isPrivateRoute || isAdminRoute)) {
    return Response.redirect(`${url}/auth/login`);
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const role = token?.role;

  // Restrict access to admin routes
  if (isAdminRoute && role !== "ADMIN") {
    console.log("REDIRECTING to /unauthorized");
    return Response.redirect(`${url}/unauthorized`);
  }

  // Restrict access to faculty routes
  if (isFacultyRoute && role === "STUDENT") {
    console.log("REDIRECTING to /unauthorized");
    return Response.redirect(`${url}/unauthorized`);
  }

  // All logged-in users can access private routes
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
