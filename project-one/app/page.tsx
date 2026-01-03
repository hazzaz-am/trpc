import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
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
