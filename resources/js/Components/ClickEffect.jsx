import { Link } from "@inertiajs/inertia-react"

export default function ClickEffect({className, href, children}){
    return (
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