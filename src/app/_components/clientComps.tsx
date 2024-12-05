"use client"

import { useActionState, useState } from "react";
import { useToast } from "~/hooks/use-toast"
import { RequestDelete, UnencryptPass } from "../_actions/serverActions";
import { auth } from "~/server/auth";

export function FormSubmitBtn(){
    const { toast } = useToast();
    return(
        <button type="submit" className="bg-red-600 h-6 w-1/4 rounded-md text-white hover:bg-red-800"
        onClick={() => toast({
            description: "Pass submitted"
        })}>Submit</button>
    )
}

export function PasswordDiv({name, pass, id, creator, iv, salt}: {name: string, pass: string, id: number, creator: string, iv: string, salt: string}){
    const [testo, setTesto] = useState(true);
    const [revealed, setRevealed] = useState(false);
    const [passState, setPassState] = useState("loading...");
    const [buffer, setBuffer] = useState('');

    function Reveal() { setRevealed(true) }
    function Unreveal() { setRevealed(false); setBuffer(''); setPassState("loading...") }
    function Hide() { setTesto(false) }
    function WritePass(input: string) { setPassState(input) }


    function HandleDelete(){
        Hide();
        RequestDelete(id, creator);
    }

    async function HandleReveal(){
        Reveal()
        const decrypted = await UnencryptPass(id, creator, iv, salt, buffer);
        WritePass(decrypted)
    }

    if(!testo) return null;

    return(
        <div className="text-black gap-4 m-2 p-4 w-56 h-48 bg-slate-400 rounded-lg">
            <div className="flex justify-between items-center">
                <p>{name}</p>
                <button className="bg-red-600 hover:bg-red-800 p-1 rounded-md text-white" onClick={HandleDelete}>Delete</button>
            </div>
            <hr className="mt-12 h-px bg-black border-0" />
            {!revealed ?
            <div className="pt-2 flex">
                <input className="w-3/4 mt-2 mr-1 rounded-md p-2" onChange={e => setBuffer(e.target.value)} /><button className="p-2 mt-2 bg-black rounded-md text-white hover:bg-slate-800" onClick={HandleReveal}>Reveal</button>
            </div> :
            <div className="flex justify-between items-center pt-2">
                <p>{passState}</p><button className="p-2 mt-2 bg-black rounded-md text-white hover:bg-slate-800" onClick={Unreveal} >Close</button>
            </div>
            }
        </div>
    )
}