import { errors, jwtVerify } from "jose";
import { defineMiddleware } from "astro/middleware";
import { LOGED_ROUTES, LOGIN_ROUTES, PUBLIC_ROUTES } from "./lib/middlewareRoutes";

const verifyAuth = async (token?: string) => {
  if (!token) {
    return { status: "unauthorized", msg: "Please pass a request token" };
  }

  try {
    const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET);
    const jwtVerifyResult = await jwtVerify(token, secret);

    return {
      status: "authorized",
      payload: jwtVerifyResult.payload,
      msg: "Successfully verified auth token",
    } as const;
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: "error", msg: err.message } as const;
    }
    console.debug(err);
    return { status: "error", msg: "Could not validate auth token" } as const;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  const lrToken = context.cookies.get("jwt")?.value;

  const currentPath = context.url.pathname;


 
  if (PUBLIC_ROUTES.includes(currentPath)) {
    return next();
  }

 
  if (LOGIN_ROUTES.includes(currentPath) && lrToken) {
    return Response.redirect(new URL("/", context.url));
  }

 
  const isLoggedRoute =
    LOGED_ROUTES.includes(currentPath) || /^\/views\/[^/]+$/.test(currentPath);

  if (isLoggedRoute && lrToken) {
    return next();
  }

  const token = context.cookies.get("jwt")?.value;

  const validationResult = await verifyAuth(token);

  switch (validationResult.status) {
    case "authorized":
      return next();
    case "unauthorized":
    case "error":
      if (currentPath.startsWith("/api/")) {
        return new Response(
          JSON.stringify({ message: validationResult.msg }),
          { status: 401 }
        );
      }
      return Response.redirect(new URL("/", context.url));
    default:
      return Response.redirect(new URL("/", context.url));
  }
});