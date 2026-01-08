import LogoutButton from "@/components/auth/logout-button";

export default function HomePageContents() {
  return (
    <div className="flex items-center justify-center h-screen">
			<div>
				<h2>This is Home Page</h2>
				<LogoutButton />
			</div>
		</div>
  )
}