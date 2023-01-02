import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatRupiah } from '@/Utils/utilstext';

export default function Dashboard(props) {
    const [data, setData] = useState({
        allPawn: '',
        storeBalance: '',
        in: '',
        out: '',
        customersPawn: '',
        deadlinesPawn: '',
    });

    useEffect(()=>{
        setData({
            allPawn: props.allPawn ?? 0,
            storeBalance: props.in - props.out ?? 0,
            in: props.in ?? 0,
            out: props.out ?? 0,
            customersPawn: props.customersPawn ?? 0,
            deadlinesPawn: props.deadlinesPawn ?? 0,
        });
    },[])

    const onChangeHandle = (e) =>{
        axios.post(route('dashboard.selectStore', {id: e.target.value}))
        .then((response)=>{
            setData({
                allPawn: response.data.allPawn ?? 0,
                storeBalance: response.data.in - response.data.out ?? 0,
                in: response.data.in ?? 0,
                out: response.data.out ?? 0,
                customersPawn: response.data.customersPawn ?? 0,
                deadlinesPawn: response.data.deadlinesPawn ?? 0,
            });
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-1 -mx-4">
                <select onChange={onChangeHandle} className='mx-4 border-[#F49D1A] border-[0.125em] rounded-[0.75em] py-2 focus:outline-none focus:ring-[#F49D1A] focus:ring-2 focus:ring-offset-2 focus:border-[#F49D1A]/60 active:border-[#F49D1A] transition-all ease-in-out'>
                    <option value="all">Semua Toko</option>
                    {props.stores.map((store, i)=> <option key={i} value={store.id}>{store.name}</option>)}
                </select>
                <div className='flex flex-wrap'>
                    {/* <div className="w-full md:max-w-[50%] md:grow-0 md:shrink-0 md:basis-1/2 px-4 py-2">
                        <div className='bg-[#57429D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#57429D]/70'>
                            <h3 className='mb-2'>Total Gadai</h3>
                            <h4 className='text-center font-bold'>Rp. 1.000.000</h4>
                        </div>
                    </div> */}
                    <div className="w-full md:max-w-[50%] px-4 py-2">
                        <div className='bg-[#57429D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#57429D]/70'>
                            <h3 className='mb-2'>Total Gadai</h3>
                            <h4 className='text-center font-bold'>Rp. {formatRupiah(data.allPawn)}</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] px-4 py-2">
                        <div className='bg-[#57429D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#57429D]/70'>
                            <h3 className='mb-2'>Sisa Saldo Gadai</h3>
                            <h4 className='text-center font-bold'>Rp. {formatRupiah(data.storeBalance)}</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] px-4 py-2">
                        <div className='bg-[#F49D1A] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#F49D1A]/70'>
                            <h3 className='mb-2'>Pendapatan</h3>
                            <h4 className='text-center font-bold'>Rp. {formatRupiah(data.in)}</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] px-4 py-2">
                        <div className='bg-[#F49D1A] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#F49D1A]/70'>
                            <h3 className='mb-2'>Pengeluaran</h3>
                            <h4 className='text-center font-bold'>Rp. {formatRupiah(data.out)}</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] px-4 py-2">
                        <div className='bg-[#10A19D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#10A19D]/70'>
                            <h3 className='mb-2'>Jumlah Data Pelanggan</h3>
                            <h4 className='text-center font-bold'>{formatRupiah(data.customersPawn)}</h4>
                        </div>
                    </div>
                    <div className="w-full md:max-w-[50%] px-4 py-2">
                        <div className='bg-[#10A19D] rounded-xl p-4 text-white text-xl shadow-lg shadow-[#10A19D]/70'>
                            <h3 className='mb-2'>Jumlah Jatuh Tempo</h3>
                            <h4 className='text-center font-bold'>{formatRupiah(data.deadlinesPawn)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
