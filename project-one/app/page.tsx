import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LandingPageContents from "./_ui/landing-page-contents";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function LandingPage() {
	const session = await getSession();

	if (session) return redirect("/home");

	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(
		trpc.count.getCount.queryOptions({ countId: "" })
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ErrorBoundary
				fallback={
					<div className="bg-red-100 p-4 rounded-md text-red-600">
						There was an error
					</div>
				}
			>
				<Suspense fallback={<div>Loading...</div>}>
					<LandingPageContents />
				</Suspense>
			</ErrorBoundary>
		</HydrationBoundary>
	);
}
