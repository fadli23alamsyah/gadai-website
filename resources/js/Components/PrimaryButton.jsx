export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-[#F49D1A] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#F49D1A]/70 focus:bg-[#F49D1A] active:bg-[#F49D1A] focus:outline-none focus:ring-2 focus:ring-[#F49D1A] focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
