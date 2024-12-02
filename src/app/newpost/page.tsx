import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function NewPostPage(){
    const session = await auth();
    if(!session) redirect('./')

    return(
        <div></div>
    )
}