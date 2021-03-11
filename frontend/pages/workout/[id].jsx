import React from 'react'
import SingleWorkout from "../../components/SingleWorkout"
export default function SingleWorkoutPage({query}) {
  const {id} = query;

  return (
    <SingleWorkout id={id} />
  )
}
