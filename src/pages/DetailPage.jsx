import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import TitleBar from '../components/TitleBar';
import EmptyState from '../components/EmptyState'
import ModalDelete from '../components/ModalDelete';
import ModalDone from '../components/ModalDone';
import TodoList from '../components/TodoList';
import ModalAdd from '../components/ModalAdd';

function DetailPage() {

    const [item, setItem] = useState([])
    const [data, setData] = useState([])
    const [done, setDone] = useState(false)
    const [sortValue, setSortValue] = useState('terbaru')
    const params = useParams()

    const getItemsList = async () => {
        await axios.get(
            `https://todo.api.devcode.gethired.id/activity-groups/${params.id}`
        ).then(response => {
            setItem(response.data)
        }).catch(err => console.alert(err.message))
    }

    const setActiveStatus = async (id, isActive) => {
        const request = {
            is_active: isActive === 0 ? 1 : 0,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, request, headers)
        await getItemsList()
        return
    }

    const createTodo = async (title, priority) => {
        const request = {
            activity_group_id: params.id,
            title,
            priority,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        await axios.post(
            `https://todo.api.devcode.gethired.id/todo-items`, request, headers
        ).then(response => {
            setItem(response.data)
        }).catch(err => console.alert(err.message))
        await getItemsList()
        setData([])
    }

    const editTodo = async (id, title, priority) => {
        const request = {
            title,
            priority,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        await axios.patch(
            `https://todo.api.devcode.gethired.id/todo-items/${id}`, request, headers
        ).then(response => {
            setItem(response.data)
        }).catch(err => console.alert(err.message))
        await getItemsList()
        setData([])
    }


    const deleteTodo = async (id) => {
        await axios.delete(
            `https://todo.api.devcode.gethired.id/todo-items/${id}`
        );
        setDone(true)
        await getItemsList()
        setData([])
    }

    const priorityOption = [
        {
            name: 'Very High',
            value: 'very-high',
            color: 'bg-[#ED4C5C]',
        },
        {
            name: 'High',
            value: 'high',
            color: 'bg-[#F8A541]',
        },
        {
            name: 'Medium',
            value: 'normal',
            color: 'bg-[#00A790]',
        },
        {
            name: 'Low',
            value: 'low',
            color: 'bg-[#428BC1]',
        },
        {
            name: 'Very Low',
            value: 'very-low',
            color: 'bg-[#8942C1]',
        }
    ]

    const sortedTodo = useMemo(() => {
        let items = item?.todo_items;

        function compare(a, b, sortedKey, sortedType) {
            if (sortedType === "desc") {
                if (a[sortedKey] < b[sortedKey]) {
                    return -1;
                }
                if (a[sortedKey] > b[sortedKey]) {
                    return 1;
                }
                return 0;
            }
            if (a[sortedKey] > b[sortedKey]) {
                return -1;
            }
            if (a[sortedKey] < b[sortedKey]) {
                return 1;
            }
            return 0;
        }

        if (sortValue === "terbaru" && items) {
            items.sort((a, b) => compare(a, b, "id", "asc"));
        }
        if (sortValue === "terlama")
            items = items?.sort((a, b) => compare(a, b, "id", "desc"));
        if (sortValue === "a_z")
            items = items?.sort((a, b) => compare(a, b, "title", "desc"));
        if (sortValue === "z_a")
            items = items?.sort((a, b) => compare(a, b, "title", "asc"));
        if (sortValue === "belum_selesai")
            items = items?.sort((a, b) => compare(a, b, "is_active", "asc"));

        return items;
    }, [sortValue, item]);

    // useEffect(() => {
    //     sortedTodo()
    // }, [sortValue])

    useEffect(() => {
        getItemsList()
    }, [])


    return (
        <>
            <TitleBar item={item} afterChange={getItemsList} setSortValue={setSortValue} sortValue={sortValue} />
            {item?.todo_items?.length === 0 ?
                <label className='min-h-[70vh] lg:min-h-[60vh] flex items-center cursor-pointer' htmlFor="my-modal-2">
                    <EmptyState />
                </label>
                :
                <div className="flex flex-col gap-2 mt-7 lg:mt-13">
                    {item?.todo_items == undefined ?
                        <></>
                        :
                        <>
                            {sortedTodo.map((todo) => (
                                <TodoList key={todo.id} item={todo} setActiveStatus={setActiveStatus} setData={setData} />
                            ))}
                        </>
                    }
                </div>
            }

            <ModalAdd priorityOption={priorityOption} data={data} setData={setData} createTodo={createTodo} editTodo={editTodo} />
            <ModalDelete data={data} deleteActivity={deleteTodo} />
            <ModalDone done={done} setDone={setDone} />
        </>
    )
}

export default DetailPage;