import { useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";

export default function FormStore(props){
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        status: '',
        total: '',
        source: '',
        store_id: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        data.id ? put(route('finance.update')) : post(route('finance.store'))
    };

    useEffect(()=>{
        if(props.finance){
            setData({
                id: props.finance.id,
                status: props.finance.status,
                total: props.finance.total,
                source: props.finance.source,
                store_id: props.finance.store_id,
            })
        }
    }, [])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">{data.id ? 'Edit' : 'Tambah'} Keuangan</h2>}
        >
            <Head title={`${data.id ? 'Edit' : 'Tambah'} Keuangan`} />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <form onSubmit={submit} method="post">
                        <div className="inline-block w-full md:w-1/2 md:pr-2">
                            <InputLabel forInput="store" value="Toko" />

                            <select name="store_id" id="store" onChange={onHandleChange} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                <option value="">Pilih Toko</option>
                                {props.stores.map((store, i)=>
                                    <option key={i} value={store.id} selected={store.id == data.store_id ? 'selected' : null}>{store.name}</option>
                                )}
                            </select>

                            <InputError message={errors.store_id} className="mt-2" />

                        </div>

                        <div className="inline-block w-full mt-4 md:w-1/2 md:pl-2 md:mt-0">
                            <InputLabel forInput="status" value="Status Keuangan" />

                            <select name="status" id="status" onChange={onHandleChange} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                <option value="">Pilih Status Keuangan</option>
                                <option value="in" selected={'in' === data.status ? 'selected' : null}>Pendapatan</option>
                                <option value="out" selected={'out' === data.status ? 'selected' : null}>Pengeluaran</option>
                            </select>

                            <InputError message={errors.status} className="mt-2" />

                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="total" value="Total" />

                            <TextInput
                                id="total"
                                name="total"
                                value={data.total}
                                type="number"
                                className="mt-1 block w-full"
                                autoComplete="total"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.total} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="source" value="Sumber" />

                            <textarea id="source" name="source" autoComplete="source" onChange={onHandleChange} rows="4" value={data.source} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"></textarea>

                            <InputError message={errors.source} className="mt-2" />
                        </div>

                        <div className="flex flex-row mt-6">
                            <DangerButton type="button" onClick={()=> window.history.back()}>Kembali</DangerButton>
                            <PrimaryButton className="ml-3" processing={processing}>Simpan</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    )
}