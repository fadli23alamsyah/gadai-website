import { useState, useEffect } from "react";
import ClickEffect from "@/Components/ClickEffect";
import Datatables from "@/Components/Datatables";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from '@inertiajs/inertia-react';
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import { Inertia } from '@inertiajs/inertia'
import { formatRupiah, ucWord } from "@/Utils/utilstext";

export default function IndexDeadline(props){
    const [isShow, setIsShow] = useState(false)
    const [pawn, setPawn] = useState({})

    const closeModal = () => {
        setPawn({});
        setIsShow(false);
    }

    const showModal = (pawn) => {
        setPawn(pawn);
        setIsShow(true);
    }

    const deleteCustomer = () => {
        Inertia.visit(route('customer.delete'),{ 
            data: pawn, method: 'delete',
        });
        setPawn({});
        setIsShow(false);
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Data Jatuh Tempo</h2>}
        >
            <Head title="Data Jatuh Tempo" />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <div className='mt-8 p-3 shadow-inner rounded-lg bg-[#fafafc]'>
                        <Datatables>
                            <thead className='bg-[#57429D] text-white'>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Nama</th>
                                    <th>Tipe</th>
                                    <th>Pengambilan</th>
                                    <th>Bunga</th>
                                    <th>Toko</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.map((item, i)=>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{new Date(item.finance.date).toLocaleDateString("id")}</td>
                                        <td>{ucWord(item.customer.name)}</td>
                                        <td>{ucWord(item.type)}</td>
                                        <td className="text-right">{formatRupiah(item.finance.total)}</td>
                                        <td className="text-right">{formatRupiah(item.interest)}</td>
                                        <td>{ucWord(item.store.name)}</td>
                                        <td>
                                            <DangerButton type="button" onClick={() => showModal(item)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </DangerButton>
                                            <PrimaryButton type="button" onClick={() =>  window.location = route('customer.edit',[item])} className="sm:ml-2 sm:mt-0 mt-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </PrimaryButton>
                                            <button type="button" onClick={() =>  window.location = route('customer.show',[item])} className="bg-purple-600 inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-600/70 focus:bg-purple-600 active:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 sm:ml-2 sm:mt-0 mt-2">
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
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
                    <div className="mt-4">Apakah anda yakin ingin menghapus data pelanggan {pawn.customer !== undefined ? pawn.customer.name : ''}</div>
                    <div className="mt-2 font-semibold">Akan menghapus data dimenu keuangan</div>
                    <div className="mt-5 mb-3 float-right">
                        <DangerButton type="button" onClick={closeModal}>
                            Tutup
                        </DangerButton>
                        <PrimaryButton type="button" onClick={deleteCustomer} className="sm:ml-2 sm:mt-0 mt-2">
                            Hapus
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

        </AuthenticatedLayout>
    )
}