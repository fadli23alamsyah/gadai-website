import { useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";

export default function FormCustomer(props){
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        phone: '',
        type: '',
        total: '',
        interest: '',
        additional: '',
        store_id: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        data.id ? put(route('customer.update')) : post(route('customer.store'))
    };

    useEffect(()=>{
        if(props.pawn){
            setData({
                id: props.pawn.id,
                name: props.pawn.customer.name,
                phone: props.pawn.customer.phone,
                type: props.pawn.type,
                total: props.pawn.finance.total,
                interest: props.pawn.interest,
                additional: props.pawn.additional,
                store_id: props.pawn.store_id,
            })
        }
    }, [])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">{data.id ? 'Edit' : 'Tambah'} Pelanggan</h2>}
        >
            <Head title={`${data.id ? 'Edit' : 'Tambah'} Pelanggan`} />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <form onSubmit={submit} method="post">
                        <h3 className="font-bold text-lg">Identitas Pelanggan</h3>

                        <div className="inline-block w-full md:w-1/2 md:pr-2">
                            <InputLabel forInput="name" value="Nama" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="inline-block w-full mt-4 md:w-1/2 md:pl-2 md:mt-0">
                            <InputLabel forInput="phone" value="Nomor Hp" />

                            <TextInput
                                id="phone"
                                name="phone"
                                type="number"
                                value={data.phone}
                                className="mt-1 block w-full"
                                autoComplete="phone"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <h3 className="font-bold text-lg mt-6">Data Gadai</h3>

                        <div className="inline-block w-full md:w-1/2 md:pr-2">
                            <InputLabel forInput="type" value="Tipe" />

                            <TextInput
                                id="type"
                                name="type"
                                value={data.type}
                                className="mt-1 block w-full"
                                autoComplete="type"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        <div className="inline-block w-full mt-4 md:w-1/2 md:pl-2 md:mt-0">
                            <InputLabel forInput="store" value="Toko" />

                            <select name="store_id" id="store" onChange={onHandleChange} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                <option value="">Pilih Toko</option>
                                {props.stores.map((store, i)=>
                                    <option key={i} value={store.id} selected={store.id == data.store_id ? 'selected' : null}>{store.name}</option>
                                )}
                            </select>

                            <InputError message={errors.store_id} className="mt-2" />
                        </div>

                        <div className="inline-block w-full mt-4 md:w-1/2 md:pr-2">
                            <InputLabel forInput="total" value="Pengambilan" />

                            <TextInput
                                id="total"
                                name="total"
                                type="number"
                                value={data.total}
                                className="mt-1 block w-full"
                                autoComplete="total"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.total} className="mt-2" />
                        </div>

                        <div className="inline-block w-full mt-4 md:w-1/2 md:pl-2">
                            <InputLabel forInput="interest" value="Bunga" />

                            <TextInput
                                id="interest"
                                name="interest"
                                type="number"
                                value={data.interest}
                                className="mt-1 block w-full"
                                autoComplete="interest"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.interest} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="additional" value="Keterangan" />

                            <textarea id="additional" name="additional" autoComplete="additional" onChange={onHandleChange} rows="3 " value={data.additional} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"></textarea>

                            <InputError message={errors.additional} className="mt-2" />
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