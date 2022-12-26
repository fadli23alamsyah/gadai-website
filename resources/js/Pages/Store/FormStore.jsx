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
        name: '',
        address: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        data.id ? put(route('store.update')) : post(route('store.store'))
    };

    useEffect(()=>{
        if(props.store){
            setData({
                id: props.store.id,
                name: props.store.name,
                address: props.store.address,
            })
        }
    }, [])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">{data.id ? 'Edit' : 'Tambah'} Toko</h2>}
        >
            <Head title={`${data.id ? 'Edit' : 'Tambah'} Toko`} />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <form onSubmit={submit} method="post">
                        <div>
                            <InputLabel forInput="name" value="Nama Toko" />

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

                        <div className="mt-4">
                            <InputLabel forInput="address" value="Alamat" />

                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.address} className="mt-2" />
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