//TODO*
const todoForm = document.querySelector('#form-todo');
const author = document.getElementById('author');
const post = document.getElementById('post');
const todoTitle = document.querySelector('.todo__title');
const list = document.querySelector('.todo__list');
const todoCount = document.querySelector('.todo__count');

const base = {
	init() {
		this.todo = this.getTodoLS();
	},
	employee: 'Петров Сергей Иванович',
	todo: [],
	check(id) {
		for (let i = 0; i < this.todo.length; i++) {
			if (this.todo[i].id === id) {
				this.todo[i].ready = true;
			}
		}
		this.setTodoLS();
	},
	addTodo(author, post) {
		const todo = {
			id: 'td' + (Date.now()),
			author,
			post,
			ready: false,
		};

		this.todo.push(todo);
		this.setTodoLS();
		return todo;
	},
	getTodoLS() {
		if(localStorage.getItem('todo')) {
			return JSON.parse(localStorage.getItem('todo'))
		}

		return [];
	},
	setTodoLS() {
		localStorage.setItem('todo', JSON.stringify(this.todo))
	}
};

const addTodo = event => {
	event.preventDefault();

	const authorText = author.value;
	const postText = post.value;

	const objTodo = base.addTodo(authorText, postText);
	const todoLi = createTodo(objTodo);

	list.append(todoLi);
	todoForm.reset();
	changeCountTodo();
};

const createTodo = ({ready, author, post, id}) => {
	const todoItem = `
		<article class = "post ${ready ? 'post_complete' : ''}">
			<h3 class = "post__author">${author}</h3>
			<p class = "post__todo">${post}</p>
			${!ready ?
				`<button
					class = "post__ready"
					type = "button"
					data-id = ${id}
					>✔</button>` :
				''
			}
		</article>
	`;

	const li = document.createElement('li');
	li.classList.add('todo__list-item');
	li.innerHTML = todoItem;

	return li;
};

const renderTodo = () => {
	base.init();
	for (let i = 0; i < base.todo.length; i++) {
		const todoLi = createTodo(base.todo[i]);
		list.append(todoLi);
	}
};

const checkTodo = event => {
	const btn = event.target.closest('.post__ready');

	if(btn) {
		const post = btn.closest('.post');
		btn.remove();
		post.classList.add('post_complete');
		const id = btn.dataset.id;
		base.check(id);
	};
};

const changeCountTodo = () => {
	let count = 0;

	base.todo.forEach(elem => {
		if (elem.ready === false) {
			count++;
		} 
	});

	todoCount.textContent = count;
}

todoForm.addEventListener('submit', addTodo);
list.addEventListener('click', checkTodo);
list.addEventListener('click', changeCountTodo);

renderTodo();
changeCountTodo();

//! Калькулятор
const formCalc = document.getElementById('form-calc'),
	  x = document.getElementById('x'),
	  y = document.getElementById('y'),
	  plus = document.getElementById('plus'),
	  minus = document.getElementById('minus'),
	  multiply = document.getElementById('multiply'),
	  division = document.getElementById('division');
let result = document.getElementById('result');

const performAdition = () => {
	result.textContent = +x.value + +y.value;
	formCalc.reset();
};

const performSubtraction = () => {
	result.textContent = x.value - y.value;
	formCalc.reset();
};

const performMultiplication = () => {
	result.textContent = x.value * y.value;
	formCalc.reset();
};

const performDivision = () => {
	result.textContent = (x.value / y.value).toFixed(2);
	formCalc.reset();
};

plus.addEventListener('click', performAdition);
minus.addEventListener('click', performSubtraction);
multiply.addEventListener('click', performMultiplication);
division.addEventListener('click', performDivision);




















