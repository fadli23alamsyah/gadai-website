import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUsers, faCalendarAlt, faChartBar, faHandshakeAngle, faDollyBox, faIdCard, faStore } from '@fortawesome/free-solid-svg-icons'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ auth, header, children }) {
    const [showSideNavigation, setShowSideNavigation] = useState(false);

    return (
        <div className='min-h-screen flex bg-[#57429D]'>
            <nav className='min-h-full lg:fixed lg:inset-y-0 lg:overflow-y-auto'>
                <div className={`${showSideNavigation? 'fixed flex z-50 bg-[#57429D]' : 'hidden'} shadow-md shadow-black lg:shadow-none py-8 w-[250px] lg:flex flex-col gap-3 pr-1 inset-y-0 overflow-y-auto`}>
                    <Link className='text-center mb-3' href="/dashboard">
                        <ApplicationLogo className="text-2xl"/>
                    </Link>
                    <div className='ml-2 text-white font-bold'>Main Menu</div>
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        <FontAwesomeIcon icon={faHouse} className="text-white bg-[#FFBF00] p-2 rounded-md ml-4" /> 
                        <span className='text-white ml-3'>Dashboard</span>
                    </NavLink>
                    <NavLink href={route('login')} active={route().current('customer')}>
                        <FontAwesomeIcon icon={faUsers} className="text-white bg-[#FFBF00] p-2 rounded-md ml-4" /> 
                        <span className='text-white ml-3'>Data Pelanggan</span>
                    </NavLink>
                    <NavLink href={route('login')} active={route().current('finance')}>
                        <FontAwesomeIcon icon={faChartBar} className="text-white bg-[#FFBF00] p-2 px-[9px] rounded-md ml-4" /> 
                        <span className='text-white ml-3'>Keuangan</span>
                    </NavLink>
                    <NavLink href={route('dashboard')} active={route().current('deadline')}>
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-white bg-[#FFBF00] p-2 px-[10px] rounded-md ml-4" /> 
                        <span className='text-white ml-3'>Jatuh Tempo</span>
                    </NavLink>
                    <NavLink href={route('dashboard')} active={route().current('redeem')}>
                        <FontAwesomeIcon icon={faHandshakeAngle} className="text-white bg-[#FFBF00] p-2 rounded-md ml-4" /> 
                        <span className='text-white ml-3'>Tebus</span>
                    </NavLink>
                    <NavLink href={route('dashboard')} active={route().current('marketprice')}>
                        <FontAwesomeIcon icon={faDollyBox} className="text-white bg-[#FFBF00] p-2 rounded-md ml-4" /> 
                        <span className='text-white ml-3'>Harga Pasar Barang</span>
                    </NavLink>
                    {(auth.user.role == 'admin') && 
                        <>
                            <div className='ml-2 text-white font-bold'>Admin Menu</div>
                            <NavLink href={route('store')} active={route().current().split('.')[0] == 'store'}>
                                <FontAwesomeIcon icon={faStore} className="text-white bg-[#FFBF00] p-2 rounded-md ml-4" /> 
                                <span className='text-white ml-3'>Toko</span>
                            </NavLink>
                            <NavLink href={route('dashboard')} active={route().current('staf')}>
                                <FontAwesomeIcon icon={faIdCard} className="text-white bg-[#FFBF00] p-2 rounded-md ml-4" /> 
                                <span className='text-white ml-3'>Staf</span>
                            </NavLink>
                        </>
                    }
                </div>
                
                {showSideNavigation && <div className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden" onClick={() => setShowSideNavigation(false)}></div>}
            </nav>

            <main className='w-full flex flex-col pb-4 px-4 lg:p-4 lg:ml-[250px]'>
                {/* ---Main Navigation--- */}
                <div className='flex flex-wrap justify-between items-center mb-5 py-4 px-6 rounded-b-3xl lg:mb-0 lg:rounded-t-3xl lg:rounded-b-none bg-white'>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setShowSideNavigation((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-[#a89bd6] hover:bg-[#FAF7FA] focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out lg:hidden"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showSideNavigation ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showSideNavigation ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className='hidden sm:block'>{header}</div>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-md leading-4 font-bold rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='block w-full text-center sm:hidden'>{header}</div>
                </div>

                {/* ---Main Content--- */}
                <div className='h-full bg-white py-4 px-6 rounded-3xl lg:pt-0 lg:rounded-t-none'>
                    {children}
                </div>
                <div className='mt-3 text-center text-white'>Copyright @ Palpal</div>
            </main>
        </div>
    );
}
