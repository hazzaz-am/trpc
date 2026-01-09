"use client";

import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export default function HomePageContents() {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const { data } = useSuspenseQuery(
		trpc.count.getCount.queryOptions({ countId: "8fb5b423-8619-44f6-8114-674bf02cde17" })
	);

	const createCount = useMutation(
		trpc.count.createCount.mutationOptions({
			onError: () =>
				toast("Error", {
					closeButton: true,
					description: "Error occurred while creating count",
				}),
			onSuccess: () =>
				queryClient.invalidateQueries({
					queryKey: trpc.count.getCount.queryKey(),
				}),
		})
	);

	const updateCount = useMutation(
		trpc.count.updateCount.mutationOptions({
			onError: () =>
				toast("Error", {
					closeButton: true,
					description: "Error occurred while updating count",
				}),
			onSuccess: () =>
				queryClient.invalidateQueries({
					queryKey: trpc.count.getCount.queryKey(),
				}),
		})
	);

	const deleteCount = useMutation(
		trpc.count.deleteCount.mutationOptions({
			onError: () =>
				toast("Error", {
					closeButton: true,
					description: "Error occurred while updating count",
				}),
			onSuccess: () =>
				queryClient.invalidateQueries({
					queryKey: trpc.count.getCount.queryKey(),
				}),
		})
	);

	return (
		<div className="flex items-center justify-center h-screen">
			<div>
				<h2>This is Home Page</h2>
				<div className="my-4">
					{data?.count ? (
						<div>
							<h4>Count is: {data.count}</h4>
							<div className="flex gap-4">
								<Button
									onClick={() => updateCount.mutate({ isIncreasing: true })}
								>
									Increase
								</Button>
								<Button
									onClick={() => updateCount.mutate({ isIncreasing: false })}
								>
									Decrease
								</Button>
								<Button
									onClick={() => deleteCount.mutate()}
									variant={"destructive"}
								>
									Delete
								</Button>
							</div>
						</div>
					) : (
						<Button onClick={() => createCount.mutate()}>Create Count</Button>
					)}
				</div>
				<LogoutButton />
			</div>
		</div>
	);
}
