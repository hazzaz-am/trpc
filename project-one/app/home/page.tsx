import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import HomePageContents from "./_ui/home-page-contents";

export default async function HomePage() {
	const session = await getSession();

	if (!session) return redirect("/login");
	return <HomePageContents />;
}
