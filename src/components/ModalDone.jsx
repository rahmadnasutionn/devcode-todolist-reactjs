import React from 'react'

function ModalDone({ done, setDone }) {
    return (
        <>
            {/* <label htmlFor="my-modal-1" className="hidden">open modal</label> */}
            <input type="checkbox" id="my-modal-1" className="modal-toggle" checked={done} onChange={() => setDone(false)} />
            <label htmlFor="my-modal-1" className="modal cursor-pointer" data-cy="modal-information">
                <label className="modal-box relative inline-flex items-center gap-4">
                    <i className='bx bx-info-circle bx-sm text-[#00A790]'></i>
                    <span className='font-medium'>
                        Activity berhasil dihapus
                    </span>
                </label>
            </label>
        </>
    )
}

export default ModalDone