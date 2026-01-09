import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomePageContents from "./_ui/home-page-contents";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function HomePage() {
	const session = await getSession();
	if (!session) return redirect("/login");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.count.getCount.queryOptions({ countId: "8fb5b423-8619-44f6-8114-674bf02cde17" })
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ErrorBoundary
				fallback={
					<div className="bg-red-100 p-4 rounded-md text-red-600">
						There was an error occurred
					</div>
				}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<HomePageContents />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}
