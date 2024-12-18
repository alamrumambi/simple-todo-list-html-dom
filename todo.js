document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.querySelector('#task');
    const submitButton = document.querySelector('#submit');
    const tasksList = document.querySelector('#tasks');

    // Ambil data dari localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Tampilkan tugas yang tersimpan
    savedTasks.forEach(task => addTask(task));

    // Nonaktifkan tombol jika input kosong
    taskInput.onkeyup = () => {
        submitButton.disabled = taskInput.value.trim() === '';
    };

    // Tambahkan tugas ke daftar dan localStorage
    document.querySelector('form').onsubmit = () => {
        const task = taskInput.value.trim();
        if (task) {
            addTask(task);
            saveTask(task);
            taskInput.value = '';
            submitButton.disabled = true;
        }
        return false; // Mencegah refresh halaman
    };

    // Fungsi untuk menambahkan tugas ke DOM
    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;

        // Tambahkan tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = function () {
            removeTask(task);
            li.remove();
        };

        li.appendChild(deleteButton);
        tasksList.appendChild(li);
    }

    // Fungsi untuk menyimpan tugas ke localStorage
    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fungsi untuk menghapus tugas dari localStorage
    function removeTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});