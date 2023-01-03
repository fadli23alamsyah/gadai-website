import { useEffect } from 'react';
import { Head } from '@inertiajs/inertia-react';
import './../../css/custom.css'

export default function Datatables({children}){
    useEffect(()=>{
        $(document).ready(function () {
            $('#datatables').DataTable();

            // wrap table with new element
            let table = document.getElementById("datatables")
            let wrapper = document.createElement('div')
            wrapper.className = 'w-full overflow-auto'
            table.replaceWith(wrapper)
            wrapper.appendChild(table)
        });
    },[])

    return (
        <div>
            <Head>
                <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css"/>
            </Head>
            <table id="datatables" className="display w-full">
                {children}
            </table>
        </div>
    )
}