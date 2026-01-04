import LogoutButton from "@/components/auth/logout-button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const session = await getSession();

	if (!session) return redirect("/login");
	return (
		<div className="flex items-center justify-center h-screen">
			<div>
				<h2>This is Home Page</h2>
				<LogoutButton />
			</div>
		</div>
	);
}
