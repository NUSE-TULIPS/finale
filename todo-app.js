const api = '/api/todos.php';
const listEl = document.getElementById('list');
const form = document.getElementById('addForm');
const titleInput = document.getElementById('title');

async function fetchTodos(){
  const res = await fetch(api);
  const todos = await res.json();
  listEl.innerHTML = '';
  todos.forEach(renderTodo);
}

function renderTodo(todo){
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <label>
      <input type="checkbox" ${todo.done ? 'checked' : ''} data-id="${todo.id}" class="toggle" />
      <span class="title ${todo.done ? 'done' : ''}">${escapeHtml(todo.title)}</span>
    </label>
    <div class="actions">
      <button data-id="${todo.id}" class="delete">Delete</button>
    </div>
  `;
  listEl.appendChild(li);
}

function escapeHtml(str){ return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]); }

form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if(!title) return;
  await fetch(api, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({title}) });
  titleInput.value = '';
  fetchTodos();
});

listEl.addEventListener('click', async e => {
  if (e.target.classList.contains('delete')){
    const id = e.target.dataset.id;
    await fetch(api + '?id=' + id, { method: 'DELETE' });
    fetchTodos();
  }
});

listEl.addEventListener('change', async e => {
  if (e.target.classList.contains('toggle')){
    const id = e.target.dataset.id;
    const done = e.target.checked ? 1 : 0;
    await fetch(api, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({id, done}) });
    fetchTodos();
  }
});

// initial load
fetchTodos();