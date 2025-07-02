// src/server/api/routers/feedback.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  submitFeedback: publicProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.anonymousFeedback.create({
        data: {
          content: input.content,
        },
      });
    }),
});
