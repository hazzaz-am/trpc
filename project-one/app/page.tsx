import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LandingPage() {
	const session = await getSession();

	if(session) return redirect("/home")
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<h2>This is Landing Page</h2>
				<Link href={"/login"}>
					<Button>Login</Button>
				</Link>
			</div>
		</div>
	);
}
