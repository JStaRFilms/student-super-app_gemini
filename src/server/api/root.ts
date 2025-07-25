import { userRouter } from "~/server/api/routers/user";
import { announcementRouter } from "~/server/api/routers/announcement";
import { resourceRouter } from "~/server/api/routers/resource";
import { feedbackRouter } from "~/server/api/routers/feedback";
import { authRouter } from "~/server/api/routers/auth";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  announcement: announcementRouter,
  resource: resourceRouter,
  feedback: feedbackRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
