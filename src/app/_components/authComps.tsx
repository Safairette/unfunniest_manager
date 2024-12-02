'use client'

import { signIn, signOut } from "next-auth/react"

/* export function SignInBtn(){
    return(
        <form action={async() => {
            "use server"
            await signIn()
        }}>
            <button type="submit">Sign In</button>
        </form>
    )
} */

export function SignInBtn(){
    return <button onClick={() => signIn()}>Sign in</button>
}

export function SignOutBtn(){
    return <button onClick={() => signOut()}>Sign out</button>
}