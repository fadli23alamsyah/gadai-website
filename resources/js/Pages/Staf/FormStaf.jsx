import Checkbox from "@/Components/Checkbox";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useEffect } from "react";

export default function FormStaf(props){
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        username: '',
        store: '',
        role: 'staf',
    });

    useEffect(()=>{
        let mystore = props.myStores && props.myStores.length > 0 ? props.myStores[0].id : '';
        if(props.staf){
            setData({
                id: props.staf.id,
                name: props.staf.name,
                username: props.staf.username,
                store: mystore,
                role: props.staf.role,
            })
        }
    }, [])

    const onHandleChange = (event)=>{
        setData(event.target.name, event.target.value);
    }

    const submit = (e)=>{
        e.preventDefault();

        data.id ? put(route('staf.update')) : post(route('staf.store'))
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-extrabold text-gray-800 leading-tight">{data.id ? 'Edit' : 'Tambah'} Staf</h2>}
        >
            <Head title={`${data.id ? 'Edit' : 'Tambah'} Staf`} />

            <div className='py-1 -mx-4'>
                <div className='flex flex-col px-5 lg:pt-5'>
                    <form onSubmit={submit} method="post">
                        <div>
                            <InputLabel forInput="name" value="Nama Staf" />

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
                            <InputLabel forInput="username" value="Username" />

                            <TextInput
                                id="username"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                handleChange={onHandleChange}
                            />

                            <InputError message={errors.username} className="mt-2" />
                        </div>

                        {props.stores.length > 0 && (
                            <div className="mt-4">
                                <InputLabel value="Pilih Toko" />

                                <div className="flex gap-6">
                                    {props.stores.map((item, i) =>
                                        <div key={i}>
                                            <Checkbox id={`store${i}`} name="store" handleChange={onHandleChange} value={item.id} isChecked={item.id == data.store}/>
                                            <InputLabel className="inline-block ml-2" forInput={`store${i}`} value={item.name}/>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                        )}

                        {!data.id && <h5 className="mt-4">*Password Default : 123456</h5>}

                        <div className="flex flex-row mt-6">
                            <DangerButton type="button" onClick={()=> history.back()}>Kembali</DangerButton>
                            <PrimaryButton className="ml-3" processing={processing}>Simpan</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

        </Authenticated>
    )
}