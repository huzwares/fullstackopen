import React from "react";

const Header = (props) => {
	return (
		<h1>{props.course['name']}</h1>
	)
}

const Part = (props) => {
	return (
		<p>
			{props.name} {props.number}
		</p>
	)
}

const Content = ({course}) => {
	return (
		<div>
			{course.parts.map(part => <Part key={part.id} name={part.name} number={part.exercises} />)}
		</div>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
		</div>
	)
}


export default Course;