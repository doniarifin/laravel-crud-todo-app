<template>
    <div class="w-6/12 p-10 mx-auto">
        <div class="flex justify-between">
            <h1 class="text-2xl"> Todo </h1>
            <span class="capitalize">Welcome {{ data.User?.name }},
                <button class="text-orange-500 underline hover:no-underline rounded-md"
                    @click="handleLogout">Logout</button></span>
        </div>
        <input type="text" class="p-2 w-64 border rounded-md" v-model="data.todoTitle" placeholder="Enter your todo" />
        <button class="bg-blue-600 text-white px-5 py-2 rounded-md ml-2 hover:bg-blue-400" @click="addTodo">Add</button>
        <Loader v-if="isLoading" />
        <ul class="border-t mt-3 cursor-pointer">
            <li :class="'py-3 border-b text-gray-600 ' + (val.has_completed ? 'line-through' : '')"
                v-for="(val, idx) in data.todos" :key="idx">
                <input type="checkbox" :checked="val.has_completed" @click="checked(val, idx)" />
                <span @click="checked(val, idx)" class="pl-3">{{ val.title }}</span>
                <button class="float-right bg-red-400 px-2 text-white font-bold rounded-md hover:bg-red-600"
                    @click="deleteTodo(val, idx)">&times;
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import Loader from '/resources/components/Loading.vue';
import { useRouter } from 'vue-router';
import store from '/resources/js/store.js';
import { useToast } from "vue-toast-notification";

const toast = useToast();

const isLoading = ref();

const data = reactive({
    User: [],
    todos: [],
    todoTitle: "",
})

let router = useRouter();

async function handleNewTodo(title) {
    try {
        const data = { title: title };
        const req = await axios.post('/api/todos', data);
        if (req.data.status) {
            isLoading.value = false
            toast.success('new todo added successfully', {
            position: 'top'
        });
        }
        return req.data.data;
    } catch (e) {
        toast.error(e, {
            position: 'top'
        });
    }
    isLoading.value = false
}

function handleLogout() {
    store.dispatch('clearAuth');
    router.push('/login')
}

async function addTodo() {
    if (data.todoTitle === "") {
        return alert("Todo cannot be empty");
    } else {
        isLoading.value = true
        const dataTodos = await handleNewTodo(data.todoTitle);
        data.todos.push(dataTodos);
        data.todoTitle = ""
        isLoading.value = false
    }
}

async function checked(val, index) {
    const reqData = { has_completed: !val.has_completed }
    const req = await axios.put(`/api/todos/${val.id}`, reqData)
    if (req.data) {
        toast.success('Todo updated', {
            position: 'top'
        });
        data.todos[index].has_completed = !val.has_completed
    } else {
        toast.error('failed to update', {
            position: 'top'
        });
    }
}

async function deleteTodo(val, index) {
    isLoading.value = true;
    if (window.confirm("Are you sure")) {
        try {
            const req = await axios.delete(`/api/todos/${val.id}`)
            if (req.data.message) {
                isLoading.value = false;
                data.todos.splice(index, 1);
                toast.success('Todo deleted', {
                    position: 'top'
                });
            }
        } catch (e) {
            toast.error(e, {
                position: 'top'
            });
        }
        isLoading.value = false
    }
}

async function getUser() {
    try {
        const res = await axios.get('/api/user');
        data.User = res.data;
    } catch (error) {
        console.error('Failed to fetch auth user:', error);
    }
}
async function getAllTodos() {
    isLoading.value = true;
    try {
        const req = await axios.get('/api/todos')
        data.todos = req.data
    } catch (e) {
        await router.push('/')
    }
    isLoading.value = false
}

onMounted(() => {
    getUser();
    getAllTodos();
});

</script>
