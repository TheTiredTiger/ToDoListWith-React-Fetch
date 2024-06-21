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
			console.log(data)
			return data;
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
		if(e.key === "Enter"){
			const sendToAPI = await fetch("https://playground.4geeks.com/todo/todos/thetiredtiger", {
				method: 'POST', 
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({label: task, is_done: false})
			});
			setList([...list, {label: task, is_done: false}]);
			setTask("");
		}
	}

	//DELETE
	async function deleteData (index){
		const deleteTask = await fetch(`https://playground.4geeks.com/todo/todos/${list[index].id}`, {
			method: "DELETE",
		});
		getData();
	}

  return (
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
				{list.map((item, index) => {
					<tr> 
						<td key={index}>
							{item.label}
						</td>
						<td
							onClick={() => deleteData(index)}>
							<i class="fa fa-times" aria-hidden="true"></i>
						</td>
					</tr>
				})}
				<tr>
					<td scope="row"
					className="tasksLeft">
						{list.length === 1? `${list.length} task left` : `${list.length} tasks left`}
					</td>
				</tr>
			</tbody>
		</table>
	  </div>
  )
};


export default App

// add username + a task to API --> DONE --> https://playground.4geeks.com/todo/todos/thetiredtiger

// create get fetch request + UseEffect --> DONE

// create post fetch request --> add a get request (getRequest()) at the end of the post request to get the updated list --> DONE

// create delete option that will remove username from the API --> DONE

// create controlled input --> DONE

// create array with task objects