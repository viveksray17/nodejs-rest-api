import { app } from "./init"
import { removeCourse } from "./helpers"

export interface course {
	id: number
	name: string
	cost: number | "free"
}
export let courses: course[] = [
	{id: 1, name: "Flask", cost: 500},
	{id: 2, name: "Typescript", cost: 200},
	{id: 3, name: "Python", cost: "free"}
]

app.get("/", (_req, res) => {
	res.send("hello")
})

app.get("/api/courses", (_req, res) => {
	res.send(courses)
})

app.post("/api/courses", (req, res) => {
	const newCourse: course = {
		id: courses.length + 1,
		name: req.body.name,
		cost: req.body.cost
	}
	courses.push(newCourse)
	res.send(newCourse)
})

app.delete("/api/courses/:id", (req, res) => {
	const foundcourse = courses.find(c => c.id === parseInt(req.params.id))
	if (foundcourse){
		removeCourse(foundcourse)
		res.send("course deleted")
	}else{
		res.send(`couldn't find course with id ${req.params.id}`)
	}
})

export { app }
