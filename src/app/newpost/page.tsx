import { redirect } from "next/navigation";
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

        type postsInsert = typeof posts.$inferInsert
        const rawFormData: postsInsert = {
            createdById: servSession.user.id,
            storedPass: formData.get('pass') as string,
            name: formData.get('name') as string
        }
        
        await db.insert(posts).values({
            storedPass: rawFormData.storedPass,
            name: rawFormData.name,
            createdById: rawFormData.createdById
        });
    }

    const session = await auth();
    if(!session) redirect('/')

    return(
        <div>
            <Form action={Submit} className="min-h-full flex flex-col w-1/3 m-auto mt-32 bg-black p-6 rounded-2xl border-slate-400 border-2 text-black">
                <input name="name" className="mb-4" />
                <input name="pass" className="mb-4" />
                <FormSubmitBtn />
            </Form>
        </div>
    )
}