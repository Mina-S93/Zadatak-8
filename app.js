let addTaskBtns = document.querySelectorAll(".add-task");
let task;
let dropzones = document.querySelectorAll(".dropzone");

addTaskBtns.forEach((addTaskBtn) => {
	addTaskBtn.addEventListener("click", () => {
		let taskValue = addTaskBtn.parentElement.childNodes[1].value;
		let parent = addTaskBtn.parentElement.parentElement.childNodes[3];
		if (taskValue) {
			addTask(taskValue, parent);
		}
		addTaskBtn.parentElement.childNodes[1].value = "";
	});
});

const addTask = (taskValue, parent) => {
	let task = document.createElement("li");
	task.classList.add("fill");
	task.setAttribute("draggable", "true");
	task.addEventListener("dragstart", dragStart);
	task.addEventListener("dragend", dragEnd);

	let taskContent = document.createElement("div");
	taskContent.innerText = taskValue;

	let trash = document.createElement("div");
	trash.innerText = "x";
	trash.addEventListener("click", removeTask);

	task.appendChild(taskContent);
	task.appendChild(trash);

	parent.insertBefore(task, parent.childNodes[0]);
};

const removeTask = (event) => {
	let tasks = event.target.parentNode.parentNode;
	let task = event.target.parentNode;
	tasks.removeChild(task);
};

// DRAG & DROP
const dragStart = (e) => {
	e.target.className += " hold";
	task = e.target;
	setTimeout(() => (e.target.className = "invisible"), 0);
};

let dragEnd = (e) => {
	e.target.className = "task fill";
};

let dragEnter = (e) => {
	e.preventDefault();
	if (e.target.className === "column dropzone") {
		e.target.className += " hovered";
	}
};

let dragOver = (e) => {
	e.preventDefault();
};

let dragLeave = (e) => {
	if (e.target.className === "column dropzone hovered") {
		e.target.className = "column dropzone";
	}
};

let dragDrop = (e) => {
	if (e.target.className === "column dropzone hovered") {
		e.target.className = "column dropzone";
	}
	e.target.append(task);
};

for (let dropzone of dropzones) {
	dropzone.addEventListener("dragenter", dragEnter);
	dropzone.addEventListener("dragover", dragOver);
	dropzone.addEventListener("dragleave", dragLeave);
	dropzone.addEventListener("drop", dragDrop);
}
