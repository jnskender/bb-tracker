import React from 'react'
import UserExercise from '../../components/UserExercise'

export default function UserExercisePage({ query }) {
  return (
    <div>
      <UserExercise id={query.id} order={query.order} workout={query.workout} exercise={query.exercise} />
    </div>
  )
}
