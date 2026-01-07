import { eq } from "drizzle-orm";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../init";
import { count } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "better-auth";

export const countRouter = createTRPCRouter({
	createCount: privateProcedure.mutation(async ({ ctx }) => {
		const existingCount = await ctx.db.query.count.findFirst({
			where: eq(count.userId, ctx.user.id),
		});

		if (existingCount) {
			throw new TRPCError({
				code: "FORBIDDEN",
				message: "One count already exist",
			});
		}

		await ctx.db.insert(count).values({
			id: `${Date.now()}`,
			count: 1,
			userId: ctx.user.id,
		});
	}),
	deleteCount: privateProcedure.mutation(async ({ ctx }) => {
		const existingCount = await ctx.db.query.count.findFirst({
			where: eq(count.userId, ctx.user.id),
		});

		if (!existingCount) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Count is not found",
			});
		}

		await ctx.db.delete(count).where(eq(count.userId, ctx.user.id));
	}),
	getCount: publicProcedure
		.input(z.object({ countId: z.string() }))
		.query(async ({ ctx, input }) => {
			const findCount = await ctx.db.query.count.findFirst({
				where: eq(count.id, input.countId),
			});

			if (!findCount) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Count not found",
				});
			}

			return findCount;
		}),
	updateCount: privateProcedure
		.input(z.object({ isIncreasing: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const existingCount = await ctx.db.query.count.findFirst({
				where: eq(count.userId, ctx.user.id),
			});

			if (!existingCount) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Count is not found",
				});
			}

			await ctx.db.update(count).set({
				count: input.isIncreasing
					? existingCount.count + 1
					: existingCount.count - 1,
			});
		}),
});
