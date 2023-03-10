import React from 'react'
import emptyActivity from '../assets/activity-empty-state.svg'
import todoActivity from '../assets/todo-empty-state.svg'

function EmptyState({ main }) {
    return (
        <div className="flex justify-center" data-cy='activity-empty-state'>
            {main ?
                <img
                    src={emptyActivity}
                    alt="empty-state"
                    className="lg:w-4/6"
                /> :
                <img
                    src={todoActivity}
                    alt="empty-list"
                    className="lg:w-4/6"
                />
            }
        </div>
    )
}

export default EmptyState;