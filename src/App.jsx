import {useState, useEffect} from 'react';
import './App.css';

function App() {
	const[task, setTask] = useState("");
	const [list, setList] = useState([]);
  
	//GET
	async function getData() {
		const response = await fetch('https://playground.4geeks.com/todo/users/thetiredtiger');
		if (response.ok) {
			const data = await response.json();
			console.log(data.todos);
			setList(data.todos);
		} else {
			console.log('error: ', response.status, response.statusText);
			return {error: {status: response.status, statusText: response.statusText}};
		};
	}

	useEffect(() => {
		getData();
	}, [])

	// POST
	async function addData (e) {
		if(e.key === "Enter" && task.trim() !== ""){
			const sendToAPI = await fetch("https://playground.4geeks.com/todo/todos/thetiredtiger", {
				method: 'POST', 
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({label: task, is_done: false})
			});
			setList([...list, {label: task, is_done: false}]);
			setTask("");
			getData();
		}
	}

	//DELETE
	async function deleteData(index) {
		const deleteTask = await fetch(`https://playground.4geeks.com/todo/todos/${list[index].id}`, {
			method: "DELETE",
		});
		getData();
	}

	//DELETE USER
 	async function handleDeleteUser () {
		const deleteAll = await fetch('https://playground.4geeks.com/todo/users/inestell'
		, {
			method: "DELETE"
		});
		setList([]);
	}

  return (
	<>
	  <div className='container-fluid'>
		<h1>My To-Do List</h1>
		<table className="table table-hover">
			<thead>
			<tr>
				<th colSpan="2">
				<input
					type="text"
					placeholder="What badassery are we up to today?"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onKeyUp={addData}
				/>
				</th>
			</tr>
			</thead>
			<tbody>
				{list.map((item, index) => (
					<tr key={index}>
					<td>{item.label}</td>
					<td className="hidden">
						<i className="fa fa-times" aria-hidden="true"
						onClick={() => deleteData(index)}></i>
					</td>
					</tr>
				))}
				<tr>
					<td colSpan="2" className="tasksLeft">
					{list.length === 1? `${list.length} task left` : `${list.length} tasks left`}
					</td>
				</tr>
			</tbody>
		</table>
 		<div className="deleteAllButton">
			<button onClick={handleDeleteUser}>Delete all</button>
		</div>
	  </div>
	</>
  )
};


export default App