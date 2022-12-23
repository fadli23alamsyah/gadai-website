import { Link } from "@inertiajs/inertia-react"

export default function ClickEffect({className, href, children}){
    return (
        // <Link href={href} as="button" className={`${className} w-fit p-1 select-none bg-white rounded-xl cursor-pointer border-solid border-[0.125em] border-[#183153] shadow-[0_0.25em_0_#183153] active:translate-y-1 active:shadow-none`}>
        //     {children}
        // </Link>
        <Link 
            href={href} 
            as="button" 
            className={`${className} 
                w-fit p-1 select-none bg-white rounded-xl cursor-pointer 
                border-solid border-[0.125em] active:translate-y-1 active:shadow-none`}
            >
            {children}
        </Link>
    )
}