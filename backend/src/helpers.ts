import { course, courses } from "./routes"

export function removeCourse(course: course):void{
	const index = courses.indexOf(course)
	if(index > -1){
		courses.splice(index, 1)
	}
}
