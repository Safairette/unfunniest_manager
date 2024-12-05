import { redirect } from "next/navigation";
import crypto, { pbkdf2Sync } from "node:crypto"
import { auth } from "~/server/auth";
import Form from "next/form"
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import { FormSubmitBtn } from "../_components/clientComps";

export default async function NewPostPage(){

    async function Submit(formData: FormData){
    'use server'
        const servSession = await auth()
        if (!servSession) return;

        const masterKey = formData.get('masterKey') as string;
        const passInput = formData.get('pass') as string;
        const nameInput = formData.get('name') as string;
        if(!masterKey || !passInput || !nameInput){ return; }
        
        const normalizedKey = masterKey.normalize();

        const encoding: BufferEncoding = 'hex';
        const salt = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        const tempKey = pbkdf2Sync(normalizedKey, salt, 100000, 32, 'sha256')
        
        const cipher = crypto.createCipheriv('aes-256-cbc', tempKey, iv);
        let encrypted = cipher.update(passInput, 'utf8', encoding);
        encrypted += cipher.final(encoding);

        type postsInsert = typeof posts.$inferInsert
        const rawFormData: postsInsert = {
            createdById: servSession.user.id,
            storedPass: encrypted,
            iv: iv.toString(encoding),
            salt: salt.toString(encoding),
            name: formData.get('name') as string
        }
        
        await db.insert(posts).values({
            storedPass: rawFormData.storedPass,
            name: rawFormData.name,
            iv: rawFormData.iv,
            salt: rawFormData.salt,
            createdById: rawFormData.createdById
        });
    }

    const session = await auth();
    if(!session) redirect('/')

    return(
        <div>
            <Form action={Submit} className="min-h-full flex flex-col w-1/3 m-auto mt-32 bg-black p-6 rounded-2xl border-slate-400 border-2 text-white">
                <label htmlFor="name">Name:</label>
                <input name="name" required={true} className="mb-4 h-8 p-2 rounded-sm text-black" />
                <label htmlFor="pass">Password:</label>
                <input name="pass" required={true} className="mb-4 h-8 p-2 rounded-sm text-black" />
                <label htmlFor="masterKey">Master Key:</label>
                <input name="masterKey" required={true} className="mb-4 h-8 p-2 rounded-sm text-black" />
                <FormSubmitBtn />
            </Form>
        </div>
    )
}