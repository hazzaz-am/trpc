import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(() => ({ db }));

type Context = {
	db: typeof db;
};

const t = initTRPC.context<Context>().create({
	transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
export const privateProcedure = t.procedure.use(
	t.middleware(async ({ ctx, next }) => {
		const session = await getSession();

		if (!session)
			throw new TRPCError({
				code: "UNAUTHORIZED",
			});

		return next({
			ctx: {
				...ctx,
				user: session.user,
			},
		});
	})
);
