import Authenticated from "@/Layouts/AuthenticatedLayout"
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function ShowCustomer(props){
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        main: '',
        interest: '',
        total: '',
        status: '',
    });

    const [isShow, setIsShow] = useState(false);

    const showModal = (status) => {
        setData({
            name: status === 'redeem' ? props.pawn.customer.name : '',
            phone: status === 'redeem' ? props.pawn.customer.phone : '',
            status: status,
        });
        setIsShow(true);
    }

    const closeModal = () => {
        setIsShow(false);
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('customer.release', props.pawn))
    };


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Detail Pelanggan</h2>}
        >
            <Head title="Detail Pelanggan"/>

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    <h3 className="font-bold text-lg">Identitas Pelanggan</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>Nama Pelanggan</td>
                                <td className="px-1">:</td>
                                <td className="w-[70%] font-semibold">{props.pawn.customer.name}</td>
                            </tr>
                            <tr>
                                <td>Nomor Hp</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{props.pawn.customer.phone}</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <h3 className="font-bold text-lg mt-6">Data Gadai</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>Toko</td>
                                <td className="px-1">:</td>
                                <td className="w-[70%] font-semibold">{props.pawn.store.name}</td>
                            </tr>
                            <tr>
                                <td>Tanggal</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{props.pawn.finance.date}</td>
                            </tr>
                            <tr>
                                <td>Tipe</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{props.pawn.type}</td>
                            </tr>
                            <tr>
                                <td>Pengambilan</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{props.pawn.finance.total}</td>
                            </tr>
                            <tr>
                                <td>Bunga</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{props.pawn.interest}</td>
                            </tr>
                            <tr>
                                <td>Keterangan</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{props.pawn.additional}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex flex-row mt-6">
                        <DangerButton type="button" onClick={()=> window.history.back()}>Kembali</DangerButton>
                        <PrimaryButton className="ml-3" onClick={() => showModal('redeem')}>Tebus</PrimaryButton>
                        <button type="button" onClick={() => showModal('auction')} className="bg-purple-600 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-600/70 focus:bg-purple-600 active:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ml-3">
                            Lelang
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Delete */}
            <Modal closeable={false} show={isShow} maxWidth="md" onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-center text-xl font-bold">{data.status === 'redeem'? 'Tebus' : 'Lelang'} Data</h3>
                    <form onSubmit={submit} method="post">
                        <div>
                            <InputLabel forInput="name" value="Nama Pelanggan" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                disabled={data.status === 'redeem'}
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
                                disabled={data.status === 'redeem'}
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
                                type="number"
                                value={data.main}
                                className="mt-1 block w-full"
                                autoComplete="main"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.main} className="mt-2" />
                        </div>

                        <div className="mt-4">
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
                            <InputLabel forInput="total" value="Total" />

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

                        <div className="flex flex-row justify-end mt-6">
                            <DangerButton type="button" onClick={closeModal}>Kembali</DangerButton>
                            <PrimaryButton className="ml-3" processing={processing}>Simpan</PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

        </Authenticated>
    )
}