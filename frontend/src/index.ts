async function fetchcourses(): Promise<void>{
	const response = await fetch("http://localhost:3000/api/courses")
	const courses = await response.json()
	const coursediv = document.getElementById("courses")! as HTMLDivElement
	coursediv.innerText = JSON.stringify(courses)
}
