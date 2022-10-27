type course = {
	id: number
	name: string
}
async function fetchcourses(): Promise<void>{
	const response = await fetch("http://localhost:3000/api/courses")
	const courses: course[] = await response.json()

	// Sort the Courses
	courses.sort((a, b) => a.id - b.id)

	// DOM manipulation
	const coursediv = document.getElementById("coursediv")! as HTMLDivElement
	let courseList: string = "";
	// Loop over the courses
	for(let i=0;i<courses.length;i++){
		courseList += `<li>id: ${courses[i].id}, name: ${courses[i].name}</li>`
	}
	coursediv.innerHTML = `<ul>${courseList}</ul>`
}
