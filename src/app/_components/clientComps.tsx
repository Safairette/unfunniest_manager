"use client"

import { useState } from "react";
import { useToast } from "~/hooks/use-toast"

export function FormSubmitBtn(){
    const { toast } = useToast();
    return(
        <button type="submit" className="bg-red-600 w-1/4 rounded-md text-white hover:bg-red-800"
        onClick={() => toast({
            description: "Pass submitted"
        })}>Submit</button>
    )
}

export function PasswordDiv({name, pass}: {name: string | null, pass: string | null}){
    const [testo, setTesto] = useState(true);
    function setFalse(){
        setTesto(false)
    }
    if(!testo) return null;
    
    return(
        <div className="text-black gap-4 m-2 p-4 w-56 h-48 bg-slate-400 rounded-lg">
            <div className="flex justify-between items-center">
                <p>{name}</p>
                <button className="bg-red-600 hover:bg-red-800 p-1 rounded-md" onClick={setFalse}>Delete</button>
            </div>
            <p className="mt-12 border-t-2 border-black">{pass}</p>
        </div>
    )
}