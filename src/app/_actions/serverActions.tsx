"use server"

import crypto, { pbkdf2Sync } from "crypto";
import { and, eq } from "drizzle-orm";
import { auth } from "~/server/auth"
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function RequestDelete(postId: number, postUserId: string){
    const session = await auth();
    if(!session || session.user.id != postUserId) return;

    await db.delete(posts).where(
        and(
            eq(posts.id, postId),
            eq(posts.createdById, postUserId)
        )
    );
}

export async function UnencryptPass(id: number, creator: string, iv: string, salt: string, bufferInput: string) : Promise<string> {
    const session = await auth();
    if(!session || session.user.id != creator) return "you should never see this";


    const output = await db.query.posts.findFirst({
        where: eq(posts.id, id)
    })
    if(!output) return "this should never happen";
    const encryptedPass = output.storedPass;
    const normBuffer = bufferInput.normalize();
    const decPass = Buffer.from(encryptedPass, 'hex');
    const decSalt = Buffer.from(salt, 'hex');
    const decIv = Buffer.from(iv, 'hex');

    try{
        let tempKey = pbkdf2Sync(normBuffer, decSalt, 100000, 32, 'sha256');
        const cipher = crypto.createDecipheriv('aes-256-cbc', tempKey, decIv);
        const final = cipher.update(decPass);
        const finalest = Buffer.concat([final, cipher.final()]).toString();
        return finalest;
    }
    catch{
        return "Decryption Error =["
    }
}