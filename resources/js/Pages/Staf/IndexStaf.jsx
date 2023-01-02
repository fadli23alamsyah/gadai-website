import ClickEffect from "@/Components/ClickEffect";
import DangerButton from "@/Components/DangerButton";
import Datatables from "@/Components/Datatables";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ucWord } from "@/Utils/utilstext";
import { faEdit, faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function IndexStaf(props){
    const [message, setMessage] = useState(props.flash.message)
    const [isShow, setIsShow] = useState(false)
    const [isShowReset, setIsShowReset] = useState(false)
    const [staf, setStaf] = useState({})

    useEffect(()=>{
        if(message) close()
    }, [])

    const close = ()=>{
        setTimeout(()=>{
            setMessage('')
            props.flash.isSuccess = null
            props.flash.message = null
        }, 3000)
    }

    const showModal = (staf, type)=>{
        setStaf(staf);
        (type === 'delete') ? setIsShow(true) : setIsShowReset(true);
    }

    const closeModal = ()=>{
        setStaf({});
        setIsShow(false);
        setIsShowReset(false);
    }

    const deleteStaf = ()=>{
        Inertia.visit(route('staf.delete'),{
            data: staf,
            method: 'delete',
        });
        setStaf({});
        setIsShow(false);
    }

    const resetPassword = ()=>{
        Inertia.visit(route('staf.reset'),{
            data: staf,
            method: 'put',
        });
        setStaf({});
        setIsShowReset(false);
    }
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">Data Staf</h2>}
        >
            <Head title="Data Staf" />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <ClickEffect href={route('staf.add')} className="inline-block ml-auto bg-[#F49D1A]/60 border-[#F49D1A] shadow-[0_0.25em_0_#F49D1A] hover:bg-[#F49D1A]/70">
                        <p className='text-md mx-4 my-1 font-bold text-black'>Tambah Data</p>
                    </ClickEffect>
                    
                    {message && <div className={`w-full text-white rounded-md ${props.flash.isSuccess ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 mt-6`}>{message}</div>}

                    <div className='mt-8 p-3 shadow-inner rounded-lg bg-[#fafafc]'>
                        <Datatables>
                            <thead className='bg-[#57429D] text-white'>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Staf</th>
                                    <th>Username</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.map((item, i)=>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{ucWord(item.name)}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <DangerButton type="button" onClick={() => showModal(item, 'delete')}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </DangerButton>
                                            <DangerButton className="sm:ml-2 sm:mt-0 mt-2 bg-blue-800 hover:bg-blue-600 focus:ring-blue-600" type="button" onClick={() => showModal(item, 'reset')}>
                                                <FontAwesomeIcon icon={faKey} />
                                            </DangerButton>
                                            <PrimaryButton type="button" onClick={() =>  window.location = route('staf.edit',[item])} className="sm:ml-2 sm:mt-0 mt-2">
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

            {/* Modal Reset Password */}
            <Modal show={isShowReset} maxWidth="md" onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-center text-xl font-bold">Reset Password</h3>
                    <div className="mt-4">Apakah anda yakin ingin mereset password staf {staf.name} ?</div>
                    <div className="mt-4">Password Default yaitu <b>123456</b></div>
                    <div className="mt-5 mb-3 float-right">
                        <DangerButton type="button" onClick={closeModal}>
                            Tutup
                        </DangerButton>
                        <PrimaryButton type="button" onClick={resetPassword} className="sm:ml-2 sm:mt-0 mt-2">
                            Reset
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* Modal Delete */}
            <Modal show={isShow} maxWidth="md" onClose={closeModal}>
                <div className="p-4">
                    <h3 className="text-center text-xl font-bold">Hapus Data</h3>
                    <div className="mt-4">Apakah anda yakin ingin menghapus {staf.name} ?</div>
                    <div className="mt-5 mb-3 float-right">
                        <DangerButton type="button" onClick={closeModal}>
                            Tutup
                        </DangerButton>
                        <PrimaryButton type="button" onClick={deleteStaf} className="sm:ml-2 sm:mt-0 mt-2">
                            Hapus
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

        </Authenticated>
    )
}