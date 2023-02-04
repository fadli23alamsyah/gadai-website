import Authenticated from "@/Layouts/AuthenticatedLayout"
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { formatRupiah, ucWord } from "@/Utils/utilstext";

export default function ShowCustomer(props){
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        phone: '',
        main: '',
        interest: '',
        total: '',
        status: '',
        date: '',
    });

    const [isShow, setIsShow] = useState(false);

    const showModal = (status) => {
        setData({
            name: status === 'redeem' || status === 'extended' ? props.pawn.customer.name : '',
            phone: status === 'redeem' || status === 'extended' ? props.pawn.customer.phone : '',
            main: props.pawn.finance.total,
            interest: props.pawn.finance.total * props.pawn.interest/100,
            total: parseInt(props.pawn.finance.total) + (props.pawn.finance.total * props.pawn.interest/100),
            status: status,
            date: '',
        });
        setIsShow(true);
    }

    const closeModal = () => {
        setIsShow(false);
        clearErrors()
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleTypeNumberRupiah = (event) => {
        setData(event.target.name, event.target.value.replace(/[^0-9]/g,''));
    }

    const submit = (e) => {
        e.preventDefault();

        data.status === 'extended' ? post(route('customer.extended', props.pawn)) : post(route('customer.release', props.pawn))
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
                                <td className="w-[70%] font-semibold">{ucWord(props.pawn.customer.name)}</td>
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
                                <td className="w-[70%] font-semibold">{ucWord(props.pawn.store.name)}</td>
                            </tr>
                            <tr>
                                <td>Tanggal</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{new Date(props.pawn.finance.date).toLocaleDateString("id")}</td>
                            </tr>
                            <tr>
                                <td>Tipe</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{ucWord(props.pawn.type)}</td>
                            </tr>
                            <tr>
                                <td>Pengambilan</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">Rp. {formatRupiah(props.pawn.finance.total)}</td>
                            </tr>
                            <tr>
                                <td>Bunga</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">Rp. {formatRupiah(props.pawn.finance.total * props.pawn.interest/100)} ({formatRupiah(props.pawn.interest)}%)</td>
                            </tr>
                            <tr>
                                <td>Keterangan</td>
                                <td className="px-1">:</td>
                                <td className="font-semibold">{ucWord(props.pawn.additional)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex flex-row mt-6">
                        <DangerButton type="button" onClick={()=> window.history.back()}>Kembali</DangerButton>
                        <PrimaryButton className="ml-3" onClick={() => showModal('redeem')}>Tebus</PrimaryButton>
                        <PrimaryButton className="ml-3 bg-[#9333EA] hover:bg-purple-600/70 focus:bg-purple-600 active:bg-purple-600 focus:ring-purple-600" onClick={() => showModal('auction')}>Lelang</PrimaryButton>
                        <PrimaryButton className="ml-3 bg-green-600 hover:bg-green-600/70 focus:bg-green-600 active:bg-green-600 focus:ring-green-600" onClick={() => showModal('extended')}>Perpanjang</PrimaryButton>
                    </div>
                </div>
            </div>

            {/* Modal Form Release */}
            <Modal closeable={false} show={isShow} maxWidth="md" onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-center text-xl font-bold">{data.status === 'redeem'? 'Tebus' : 'Lelang'} Data</h3>
                    <form onSubmit={submit} method="post">
                        <div className="inline-block w-full mb-2">
                            <InputLabel forInput="date" value="Tanggal" />

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                value={data.date}
                                className="mt-1 block w-full"
                                autoComplete="date"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.date} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="name" value="Nama Pelanggan" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                disabled={data.status === 'redeem' || data.status === 'extended'}
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
                                disabled={data.status === 'redeem' || data.status === 'extended'}
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