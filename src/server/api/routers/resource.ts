// src/server/api/routers/resource.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const resourceRouter = createTRPCRouter({
  getResources: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.resource.findMany({
      orderBy: { createdAt: "desc" },
      include: { uploader: true },
    });
  }),
  createResource: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        fileUrl: z.string(),
        type: z.string(),
        courseCode: z.string(),
        level: z.number(),
        semester: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.resource.create({
        data: {
          ...input,
          uploaderId: ctx.session.user.id,
        },
      });
    }),
});
