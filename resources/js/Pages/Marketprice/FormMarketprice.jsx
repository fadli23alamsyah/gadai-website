import { useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";
import { formatRupiah } from "@/Utils/utilstext";

export default function FormMarketprice(props){
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        type: '',
        price: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleTypeNumberRupiah = (event) => {
        setData(event.target.name, event.target.value.replace(/[^0-9]/g,''));
    }

    const submit = (e) => {
        e.preventDefault();

        data.id ? put(route('marketprice.update')) : post(route('marketprice.store'))
    };

    useEffect(()=>{
        if(props.marketprice){
            setData({
                id: props.marketprice.id,
                type: props.marketprice.type,
                price: props.marketprice.price,
            })
        }
    }, [])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">{data.id ? 'Edit' : 'Tambah'} Harga Pasaran</h2>}
        >
            <Head title={`${data.id ? 'Edit' : 'Tambah'} Harga Pasaran`} />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <form onSubmit={submit} method="post">
                        <div>
                            <InputLabel forInput="type" value="Tipe Barang" />

                            <TextInput
                                id="type"
                                name="type"
                                value={data.type}
                                className="mt-1 block w-full"
                                autoComplete="type"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="price" value="Harga" />

                            <TextInput
                                id="price"
                                name="price"
                                value={formatRupiah(data.price)}
                                className="mt-1 block w-full"
                                autoComplete="price"
                                handleChange={onHandleTypeNumberRupiah}
                            />

                            <InputError message={errors.price} className="mt-2" />
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