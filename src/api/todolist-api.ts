import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'api-key': '4473f8ae-2052-414e-ae37-341534b64cf8'}
})

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}






export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodos(){
        return instance.post<ResponseType<{item: TodoType}>>('todo-lists', {title:"NEW LiST"})
    },
    deleteTodos(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updTodos(todolistId: string, title:string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})

    }

}
