import { useState, useEffect } from "react";
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

export default function IndexRelease(props){
    const [message, setMessage] = useState(props.flash.message)
    const [isShow, setIsShow] = useState(false)
    const [release, setRelease] = useState({})

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
        setRelease({});
        setIsShow(false);
    }

    const showModal = (release) => {
        setRelease(release);
        setIsShow(true);
    }

    const deleteRelease = () => {
        Inertia.visit(route('release.delete'),{ 
            data: release, method: 'delete',
        });
        setRelease({});
        setIsShow(false);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Data Tebus & Lelang</h2>}
        >
            <Head title="Data Tebus & Lelang" />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>                    
                    {message && <div className={`w-full text-white rounded-md ${props.flash.isSuccess ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 mt-6`}>{message}</div>}
                    <div className='mt-8 p-3 shadow-inner rounded-lg bg-[#fafafc]'>
                        <Datatables>
                            <thead className='bg-[#57429D] text-white'>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Nama</th>
                                    <th>Tipe</th>
                                    <th>Total</th>
                                    <th>Toko</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.map((item, i)=>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{new Date(item.finance.date).toLocaleDateString("id")}</td>
                                        <td>{ucWord(item.customer.name)}</td>
                                        <td>{ucWord(item.pawn.type)}</td>
                                        <td className="text-right">{formatRupiah(item.finance.total)}</td>
                                        <td>{ucWord(item.store.name)}</td>
                                        <td>{item.status === 'redeem'? 'Tebus' : 'Lelang'}</td>
                                        <td>
                                            <DangerButton type="button" onClick={() => showModal(item)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </DangerButton>
                                            <PrimaryButton type="button" onClick={() =>  window.location = route('release.edit',[item])} className="sm:ml-2 sm:mt-0 mt-2">
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
                    <div className="mt-4">Apakah anda yakin ingin menghapus {release.customer ? release.customer.name : ''}</div>
                    <div className="mt-2 font-semibold">Akan menghapus data dimenu keuangan</div>
                    <div className="mt-5 mb-3 float-right">
                        <DangerButton type="button" onClick={closeModal}>
                            Tutup
                        </DangerButton>
                        <PrimaryButton type="button" onClick={deleteRelease} className="sm:ml-2 sm:mt-0 mt-2">
                            Hapus
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    )
}