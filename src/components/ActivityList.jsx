import React from 'react'
import { useNavigate } from 'react-router-dom'

function ActivityList(props) {

    const nav = useNavigate()

    function dateFunc(value) {
        let val = value.slice(0, 10).split("-");
        let monthNumber = parseInt(val[1]);
        let monthName = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ][monthNumber - 1];
        val[1] = monthName;
        val = val.reverse().join(" ");
        return val;
    }

    const handleDel = (event) => {
        props.setData({
            id: props.id,
            title: props.title,
            route: "activity",
        })

        event.stopPropagation();
    }

    const handleClick = (event) => {
        nav(`/detail/${props.id}`)
        event.stopPropagation();

    }

    return (
        <div
            onClick={handleClick}
            className='p-6 w-full lg:w-56 h-56 bg-white rounded-xl border border-gray-200 shadow-xl inline-flex flex-col justify-between cursor-pointer'>
            <h1 className='mb-2 text-xl font-bold'
                data-cy="activity-item-title">
                {props.title}
            </h1>
            <div className='flex flex-row justify-between items-center' >
                <p className=' lg:font-medium text-gray-700 text-sm'
                    data-cy="activity-item-date">
                    {dateFunc(props.date)}
                </p>
                <label
                    htmlFor="my-modal"
                    className="btn modal-button btn-circle btn-sm btn-outline btn-error"
                    data-cy="activity-item-delete-button"
                    onClick={handleDel}
                >
                    <i className='bx bx-trash'></i>
                </label>
            </div>

        </div>
    )
}

export default ActivityList