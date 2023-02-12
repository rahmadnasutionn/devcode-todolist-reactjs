import React from 'react'

function ModalDelete(props) {
    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal" data-cy="modal-delete">
                <label className="modal-box relative" >
                    <div className='flex flex-col gap-7 items-center'>
                        <i className='bx bx-error text-[#ED4C5C] text-8xl' ></i>
                        <h3 className="text-lg text-center">Apakah anda yakin untuk menghapus {props.data.route} <br />
                            <span className='font-bold'>"{props.data.title}"</span> ?
                        </h3>
                    </div>
                    <div className="flex justify-center p-6 gap-9">
                        <label
                            className='btn btn-active btn-accent py-3 px-9'
                            htmlFor="my-modal"
                            type="button"
                            data-cy="modal-delete-cancel-button">
                            Batal
                        </label>
                        <label
                            className='btn btn-error py-3 px-9 text-white' type="submit"
                            htmlFor="my-modal"
                            data-cy="modal-delete-confirm-button"
                            onClick={() => props.deleteActivity(props.data.id)}>
                            Hapus
                        </label>
                    </div>
                </label>
            </label>
        </>
    )
}

export default ModalDelete
