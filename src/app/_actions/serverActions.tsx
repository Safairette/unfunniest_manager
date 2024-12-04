"use server"

import { eq } from "drizzle-orm";
import { auth } from "~/server/auth"
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function RequestDelete({postId, postUserId}: {postId: number, postUserId: string}){
    const session = await auth();
    if(!session || session.user.id != postUserId) return;

    await db.delete(posts).where(eq(posts.id, postId));
}