import { useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";
import { formatRupiah } from "@/Utils/utilstext";

export default function FormRelease(props){
    const { data, setData, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        phone: '',
        main: '',
        interest: '',
        total: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleTypeNumberRupiah = (event) => {
        setData(event.target.name, event.target.value.replace(/[^0-9]/g,''));
    }

    const submit = (e) => {
        e.preventDefault();

        put(route('release.update')) 
    };

    useEffect(()=>{
        if(props.release){
            setData({
                id: props.release.id,
                name: props.release.customer.name,
                phone: props.release.customer.phone,
                main: props.release.main,
                interest: props.release.interest,
                total: props.release.finance.total,
            })
        }
    }, [])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Edit {props.release.status === 'redeem' ? 'Tebus' : 'Lelang'}</h2>}
        >
            <Head title={`Edit ${props.release.status === 'redeem' ? 'Tebus' : 'Lelang'}`} />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <h4 className="mb-4">Tipe : {props.release.pawn.type}</h4>
                    <form onSubmit={submit} method="post">
                        <div>
                            <InputLabel forInput="name" value="Nama Pelanggan" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="phone" value="No. Hp" />

                            <TextInput
                                id="phone"
                                name="phone"
                                value={data.phone}
                                type="number"
                                className="mt-1 block w-full"
                                autoComplete="phone"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="main" value="Pokok" />

                            <TextInput
                                id="main"
                                name="main"
                                value={formatRupiah(data.main)}
                                className="mt-1 block w-full"
                                autoComplete="main"
                                handleChange={onHandleTypeNumberRupiah}
                            />

                            <InputError message={errors.main} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="interest" value="Bunga" />

                            <TextInput
                                id="interest"
                                name="interest"
                                value={formatRupiah(data.interest)}
                                className="mt-1 block w-full"
                                autoComplete="interest"
                                handleChange={onHandleTypeNumberRupiah}
                            />

                            <InputError message={errors.interest} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="total" value="Total" />

                            <TextInput
                                id="total"
                                name="total"
                                value={formatRupiah(data.total)}
                                className="mt-1 block w-full"
                                autoComplete="total"
                                handleChange={onHandleTypeNumberRupiah}
                            />

                            <InputError message={errors.total} className="mt-2" />
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