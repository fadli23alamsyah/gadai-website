import { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';
import { formatRupiah } from "@/Utils/utilstext";

export default function InfoStore(props){
    const [message, setMessage] = useState({
        status: false,
        value: '',
    })
    const [edit, setEdit] = useState(false)
    const { data, setData, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        address: '',
        balance: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleChangeNominal = (event) => {
        setData(event.target.name, event.target.value.replace(/[^0-9]/g,''))
    }

    const submit = (e) => {
        e.preventDefault();

        put(route('store.updateinfo'),{
            onSuccess: (page) => {
                setEdit(false)
                setMessage({
                    status: page.props.flash.isSuccess,
                    value: page.props.flash.message,
                })
                close()
            }
        })
    };

    const close = () => {
        setTimeout(() => {
            setMessage({
                status: false,
                value: '',
            })
            props.flash.isSuccess = null
            props.flash.message = null
        }, 3000);
    }

    useEffect(()=>{
        if(props.store){
            setData({
                id: props.store.id,
                name: props.store.name,
                address: props.store.address,
                balance: props.store.balance,
            })
        }
    }, [])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Info Toko</h2>}
        >
            <Head title="Info Toko" />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    {message.value && <div className={`w-full mb-2 text-white rounded-md ${message.status ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 mt-6`}>{message.value}</div>}
                    <form onSubmit={submit} method="post">
                        <div>
                            <InputLabel forInput="name" value="Nama Toko" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                disabled={!edit}
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
                                disabled={!edit}
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="balance" value="Saldo" />

                            <TextInput
                                id="balance"
                                name="balance"
                                value={formatRupiah(data.balance)}
                                className="mt-1 block w-full"
                                autoComplete="balance"
                                disabled={!edit}
                                handleChange={onHandleChangeNominal}
                            />

                            <InputError message={errors.balance} className="mt-2" />
                        </div>

                        <div className="flex flex-row mt-6">
                            {edit && <PrimaryButton processing={processing}>Simpan</PrimaryButton>}
                            {!edit && <PrimaryButton type="button" onClick={() => setEdit(true)} >Edit</PrimaryButton>}
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    )
}