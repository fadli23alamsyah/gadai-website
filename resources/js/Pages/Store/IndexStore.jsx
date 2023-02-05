import { useState, useEffect } from "react";
import ClickEffect from "@/Components/ClickEffect";
import Datatables from "@/Components/Datatables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import { Inertia } from '@inertiajs/inertia'
import { formatRupiah, ucWord } from "@/Utils/utilstext";

export default function IndexStore(props){
    const [message, setMessage] = useState(props.flash.message)
    const [isShow, setIsShow] = useState(false)
    const [store, setStore] = useState({})

    useEffect(()=>{
        if(message) close()
    }, [])

    const close = () => {
        setTimeout(() => {
            setMessage('')
            props.flash.isSuccess = null
            props.flash.message = null
        }, 3000);
    }

    const closeModal = () => {
        setStore({});
        setIsShow(false);
    }

    const showModal = (store) => {
        setStore(store);
        setIsShow(true);
    }

    const deleteStore = () => {
        Inertia.visit(route('store.delete'),{ 
            data: store, method: 'delete',
        });
        setStore({});
        setIsShow(false);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Data Toko</h2>}
        >
            <Head title="Data Toko" />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <ClickEffect href={route('store.add')} className="inline-block ml-auto bg-[#F49D1A]/60 border-[#F49D1A] shadow-[0_0.25em_0_#F49D1A] hover:bg-[#F49D1A]/70">
                        <p className='text-md mx-4 my-1 font-bold text-black'>Tambah Data</p>
                    </ClickEffect>
                    
                    {message && <div className={`w-full text-white rounded-md ${props.flash.isSuccess ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 mt-6`}>{message}</div>}
                    <div className='mt-8 p-3 shadow-inner rounded-lg bg-[#fafafc]'>
                        <Datatables>
                            <thead className='bg-[#57429D] text-white'>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Toko</th>
                                    <th>Alamat</th>
                                    <th>Saldo</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.map((item, i)=>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{ucWord(item.name)}</td>
                                        <td>{ucWord(item.address)}</td>
                                        <td>Rp. {formatRupiah(item.balance)}</td>
                                        <td>
                                            <DangerButton type="button" onClick={() => showModal(item)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </DangerButton>
                                            <PrimaryButton type="button" onClick={() =>  window.location = route('store.edit',[item])} className="sm:ml-2 sm:mt-0 mt-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Datatables>
                    </div>
                </div>
            </div>

            {/* Modal Delete */}
            <Modal show={isShow} maxWidth="md" onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-center text-xl font-bold">Hapus Data</h3>
                    <div className="mt-4">Apakah anda yakin ingin menghapus {store.name}</div>
                    <div className="mt-5 mb-3 float-right">
                        <DangerButton type="button" onClick={closeModal}>
                            Tutup
                        </DangerButton>
                        <PrimaryButton type="button" onClick={deleteStore} className="sm:ml-2 sm:mt-0 mt-2">
                            Hapus
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    )
}