// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // If token exists, the user is authenticated
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/chat/:path*", "/chat"],
};
