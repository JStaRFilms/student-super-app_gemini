import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from "bcryptjs";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        matricNumber: z.string().min(1, "Matriculation number is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { matricNumber, password } = input;

      const existingUser = await ctx.db.user.findUnique({
        where: {
          matricNumber,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this matriculation number already exists",
        });
      }

      const hashedPassword = await hash(password, 10);

      const newUser = await ctx.db.user.create({
        data: {
          matricNumber,
          hashedPassword,
        },
      });

      return {
        id: newUser.id,
        matricNumber: newUser.matricNumber,
      };
    }),
});
