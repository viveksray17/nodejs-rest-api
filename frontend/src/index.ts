const apiHost = "http://localhost:3000";
interface course {
	id: number;
	name: string;
	cost: number | "free";
}
async function fetchcourses(): Promise<void> {
	const response = await fetch(`${apiHost}/api/courses`);
	const courses: course[] = await response.json();
	// DOM manipulation
	const courseTable = document.getElementById(
		"coursetable"
	)! as HTMLTableElement;
	let courseList: string = "";
	// Loop over the courses
	for (let i = 0; i < courses.length; i++) {
		courseList += `<tr><td>${courses[i].id}</td><td>${courses[i].name}</td><td>${courses[i].cost}</td></tr>`;
	}
	courseTable.innerHTML = courseList;
}

async function submitCourse(): Promise<void> {
	const courseName = document.getElementById("courseName")! as HTMLInputElement;
	const courseCost = document.getElementById("courseCost")! as HTMLInputElement;
	const courseNameValue = courseName.value;
	const courseCostValue = isNaN(parseInt(courseCost.value))
		? "free"
		: parseInt(courseCost.value);
	// Make a POST request
	console.log(courseCostValue)
	await fetch(`${apiHost}/api/courses`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name: courseNameValue, cost: courseCostValue }),
	});
	fetchcourses()
}
