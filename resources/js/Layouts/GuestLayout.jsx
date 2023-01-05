import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen px-5 flex flex-col justify-center items-center pt-6 sm:pt-0 bg-[#57429D]">
            <div>
                <Link href="/">
                    <ApplicationLogo className="text-3xl md:text-6xl" />
                </Link>
            </div>

            <div className="w-full max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
            <div className='mt-2 text-center text-white'>Created with ❤ by Palpal<br />&copy; 2023 - {new Date().getFullYear()}</div>
        </div>
    );
}
