import * as express from "express";
import * as Joi from "joi";
import * as cors from "cors"

const app = express();

app.use(express.json()); // to use json in body of the request. It is a middleware
app.use(cors({
	origin: "http://127.0.0.1:8080"
}))

let courses = [
	{ id: 1, name: "course1" },
	{ id: 2, name: "course2" },
];

app.get("/", (_req, res) => {
	res.send("This is response 2");
});

app.get("/api/courses", (_req, res) => {
	res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course)
		res.status(404).send("The course with the given id was not found");
	else res.send(course);
});

app.post("/api/courses", (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	const result = schema.validate(req.body);
	if (result.error) {
		// 400 Bad Request
		res.status(400).send(result.error.details[0].message);
		return;
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name! as string,
	};
	courses.push(course);
	res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
	/*
	look up the course
	if not existing, return 404 -> resourse not found
	
	validate
	if invalid, return 400 -> Bad request
	
	Update course
	return the updated course

	*/
	// finds the course
	const course = courses.find(c => c.id === parseInt(req.params.id))
	// if it doesn't exist then return 404
	if (!course) {
		res.status(404).send("The course with the given id was not found");
	}
	// if it exists then validate the put body
	else{
		// validation
		const schema = Joi.object({
			name: Joi.string().min(3).required()
		})
		const result = schema.validate(req.body)
		if(result.error){
			res.status(400).send(result.error.details[0].message)
		}
		// if validation is successfull remove the old course
		else{
			// create a new course object
			const newcourse = {
				id: course.id,
				name: req.body.name! as string
			}
			// remove the course object
			const index = courses.indexOf(course)
			courses.splice(index, 1)

			// add the newcourse to courses
			courses.push(newcourse)
			res.send(newcourse)
		}
	}
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
