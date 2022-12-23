import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center py-1 transition duration-150 ease-in-out rounded-r-full hover:bg-purple-600 ${active ? ' bg-purple-600' : '  bg-transparent'}`}
        >
            {active ? <span className='h-[40px] w-[5px] bg-[#FFBF00] rounded-r-md overflow-hidden transition ease-in-out duration-150'></span> : null}
            {children}
        </Link>
    );
}
