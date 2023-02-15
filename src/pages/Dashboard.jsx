import { useEffect, useState } from 'react'
import axios from 'axios';
import EmptyState from '../components/EmptyState'
import TitleBar from '../components/TitleBar'
import ActivityList from '../components/ActivityList';
import ModalDelete from '../components/ModalDelete';
import ModalDone from '../components/ModalDone';

function Dashboard() {

    const [activity, setActivity] = useState([])
    const [click, setClick] = useState(false)
    const [data, setData] = useState([])
    const [done, setDone] = useState(false)

    const getActivities = async () => {
        await axios.get(
            `https://todo.api.devcode.gethired.id/activity-groups?email=rahmad12@gmail.com`
        ).then(response => {
            setActivity(response.data.data)
        }).catch(err => console.alert(err.message))
    }

    const addActivity = async () => {
        const request = {
            title: "New Activity",
            email: "rahmad12@gmail.com",
        }
        const headers = {
            "Content-Type": "application/json",
        }
        await axios.post("https://todo.api.devcode.gethired.id/activity-groups", request, headers)
        setClick(!click)
    }

    const deleteActivity = async (id) => {
        await axios.delete(
            `https://todo.api.devcode.gethired.id/activity-groups/${id}`
        );
        setDone(true)
        setActivity(activity.filter((val) => val.id !== id))
        setData([])
    }

    useEffect(() => {
        getActivities()
    }, [click])

    return (
        <>
            <TitleBar addActivity={addActivity} />
            {activity.length == 0 ?
                <div className='min-h-[70vh] lg:min-h-[60vh] flex items-center' onClick={addActivity}>
                    <EmptyState main />
                </div>
                :
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-4 mt-7 lg:mt-13 max-w-5xl' data-cy="activity-item">
                    {activity.map((act) => (
                        <ActivityList key={act.id} title={act.title} date={act.created_at} id={act.id} data={data} setData={setData} />
                    ))}
                </div>
            }
            <ModalDelete data={data} deleteActivity={deleteActivity} />
            <ModalDone done={done} setDone={setDone} />
        </>
    )
}

export default Dashboard