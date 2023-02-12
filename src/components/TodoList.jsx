import React from 'react'

function TodoList({ item, setActiveStatus, setData }) {

    const handleDel = (event) => {
        setData({
            id: item.id,
            title: item.title,
            route: "list item",
        })

        event.stopPropagation();
    }

    const handleEdit = (event) => {
        setData({
            id: item.id,
            title: item.title,
            priority: item.priority,
            edit: true
        })

        event.stopPropagation();
    }

    return (
        <div className='p-6 w-full h-20 bg-white rounded-xl border border-gray-200 shadow-xl inline-flex flex-col' data-cy="todo-item">
            <div className='flex flex-row justify-between items-center'>
                <div className='inline-flex items-center gap-4'>
                    <input
                        type="checkbox"
                        data-cy="todo-item-checkbox"
                        id={'checkbox-' + item.id}
                        className="checkbox"
                        onChange={() => setActiveStatus(item.id, item.is_active)}
                        checked={item?.is_active === 0}
                    />
                    <div className={`inline-flex rounded-full h-3 w-3 ${item.priority === 'very-high' ? "bg-[#ED4C5C]" : item.priority === 'high' ? 'bg-[#F8A541]' : item.priority === 'normal' ? 'bg-[#00A790]' : item.priority === 'low' ? 'bg-[#428BC1]' : 'bg-[#8942C1]'}`}></div>
                    <p
                        className={`text-md text-gray-700 ${item.is_active === 0 ? 'line-through' : ''}`}
                        data-cy="todo-item-title"
                    >
                        {item.title}
                    </p>

                    <label
                        htmlFor="my-modal-2"
                        type="button"
                        className="cursor-pointer modal-button pt-1"
                        onClick={handleEdit}
                    >
                        <i className='bx bx-pencil'></i>
                    </label>

                </div>
                <label
                    htmlFor="my-modal"
                    className="btn modal-button btn-circle btn-sm btn-outline btn-error"
                    data-cy="todo-item-delete-button"
                    onClick={handleDel}
                >
                    <i className='bx bx-trash'></i>
                </label>
            </div>
        </div>
    )
}

export default TodoList