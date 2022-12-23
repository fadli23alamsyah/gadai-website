import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-1 -mx-4">
                <div className='flex flex-wrap'>
                    <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#57429D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#57429D]/70'>
                            <h3 className='mb-2'>Total Gadai</h3>
                            <h4 className='text-center font-bold'>Rp. 1.000.000</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#57429D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#57429D]/70'>
                            <h3 className='mb-2'>Sisa Saldo Gadai</h3>
                            <h4 className='text-center font-bold'>Rp. 1.000.000</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#F49D1A] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#F49D1A]/70'>
                            <h3 className='mb-2'>Pendapatan</h3>
                            <h4 className='text-center font-bold'>Rp. 1.000.000</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#F49D1A] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#F49D1A]/70'>
                            <h3 className='mb-2'>Pengeluaran</h3>
                            <h4 className='text-center font-bold'>Rp. 1.000.000</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#10A19D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#10A19D]/70'>
                            <h3 className='mb-2'>Jumlah Data Pelanggan</h3>
                            <h4 className='text-center font-bold'>1.000.000</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#10A19D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#10A19D]/70'>
                            <h3 className='mb-2'>Jumlah Jatuh Tempo</h3>
                            <h4 className='text-center font-bold'>1.000.000</h4>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
