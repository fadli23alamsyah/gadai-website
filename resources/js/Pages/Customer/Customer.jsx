import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ButtonClick from '@/Components/ClickEffect'
import { Head } from '@inertiajs/inertia-react';
import Datatables from '@/Components/Datatables';

export default function Customer(props){
    
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Data Pelanggan</h2>}
        >
            <Head title="Data Pelanggan"/>

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <ButtonClick className="inline-block ml-auto bg-[#F49D1A]/60 border-[#F49D1A] shadow-[0_0.25em_0_#F49D1A] hover:bg-[#F49D1A]/70">
                        <p className='text-md mx-4 my-1 font-bold text-black'>Tambah Data</p>
                    </ButtonClick>
                    <div className='mt-8 p-3 shadow-inner rounded-lg bg-[#fafafc]'>
                        <Datatables />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}