"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function LandingPageContents() {
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.count.getCount.queryOptions({ countId: "" })
	);
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<h2>This is Landing Page</h2>
				<div className="bg-green-100 my-4 text-green-600 p-4 rounded-md">
					{data?.count ? `Count is: ${data.count}` : "No Count Found"}
				</div>
				<Link href={"/login"}>
					<Button>Login</Button>
				</Link>
			</div>
		</div>
	);
}
