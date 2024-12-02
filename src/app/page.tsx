import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="flex min-h-svh bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
     <CoreContent />
    </main>
  );
}

async function CoreContent(){
  const session = await auth()
  const items = await db.query.users.findMany();
  console.log(items)

  if (!session) return (<div className="m-auto">Login to use the app</div>)
  return(
    <div className="flex flex-wrap p-4">
      {items.map((post) => (<div className="text-black gap-4 p-4 w-60 h-48 bg-slate-400 rounded-lg" key={post.id}>{post.name}</div>))}
    </div>
  )
}