import { eq } from "drizzle-orm";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { PasswordDiv } from "./_components/clientComps";

export default async function HomePage() {
  const session = await auth();
  return (
    <main className="flex flex-col min-h-svh bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
     <CoreContent />
    </main>
  );
}

async function CoreContent(){
  const session = await auth();
  if (!session) return (<div className="m-auto">Login to use the app</div>);

  const items = await db.query.posts.findMany({
    where: eq(posts.createdById, session.user.id)
  })

  return(
    <div className="flex flex-wrap p-2">
      {items.map((post) => (<PasswordDiv key={post.id} name={post.name} pass={post.storedPass} />))}
    </div>
  )
}