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

const Total = ({ course }) => {
	const sum = course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
	return (
		<p>Number of exercises {sum}</p>
	)
}

const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map(part => <Part key={part.id} name={part.name} number={part.exercises} />)}
			<Total course={course} />
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