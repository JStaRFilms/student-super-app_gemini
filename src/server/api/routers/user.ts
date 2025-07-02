// src/server/api/routers/user.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        matricNumber: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      return ctx.db.user.create({
        data: {
          matricNumber: input.matricNumber,
          hashedPassword,
        },
      });
    }),
});
