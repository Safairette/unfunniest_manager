import { auth } from "~/server/auth";
import { SignInBtn, SignOutBtn } from "./authComps";
import Link from "next/link";

export function TopNav(){
    return (
      <nav className="flex items-center justify-between border-b w-full p-4 text-xl font-semibold bg-black text-white">
        <div><Link href="/">Top bar (waow)</Link></div>
        <div>
			<UserBtn />
		</div>
      </nav>
    )
  }

export async function NewPassBtn(){
	const session = await auth();
	if (!session) return null;
	return (
		<div className="bg-red-600 rounded-lg p-1 mr-4 m-auto hover:bg-red-800">
			<Link href="./newpost">Add pass</Link>
		</div>
	)
}

export async function UserBtn(){
	const session = await auth();
	if (!session?.user) return <SignInBtn />
	return (
		<div className="flex">
			<NewPassBtn />
			<img alt={'Profile picture'} className="h-8 w-8 mr-2 rounded-full" src={session.user.image ?? undefined}></img>
			<SignOutBtn />
		</div>
	)
}