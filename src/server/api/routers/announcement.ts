// src/server/api/routers/announcement.ts
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const announcementRouter = createTRPCRouter({
  getLatestAnnouncements: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.announcement.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { author: true },
    });
  }),
  getAllAnnouncements: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.announcement.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });
  }),
});
