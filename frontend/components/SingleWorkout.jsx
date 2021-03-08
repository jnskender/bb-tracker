import { useMutation, useQuery } from '@apollo/client'
import { useSession } from "next-auth/client"
import gql from 'graphql-tag'
import Link from 'next/link';
import React from 'react'
import { CREATE_USER_EXERCISE } from "../lib/Models/UserExercises/mutations/UserExerciseMutations"

const SINGLE_WORKOUT_QUERY = gql`
  query SINGLE_WORKOUT_QUERY($id: ID!){
    workouts(where:{
      id: $id
    }) {
      id
      name
    }
    workoutExercises(where:{
      workout: $id
    }){
    order
    exercise{
      id
      name
    }
  }
  }
`

export default function SingleWorkoutPage({ id }) {
  const [session, sessionLoading] = useSession();
  const { data, loading, error } = useQuery(SINGLE_WORKOUT_QUERY, {
    variables: {
      id
    }
  });
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  const workout = data.workouts[0];
  const we = data.workoutExercises;
  const [createUserExercise] = useMutation(
    CREATE_USER_EXERCISE,
    {
      variables: {
        exercise: we[0].exercise.id,
        user: session?.id,
        workout: workout.id
      }
    }
  )

  const handleStart = async () => {
   const res = await createUserExercise()
   console.log(res)
  }

  console.log({ data, loading, error })


  //const { workouts } = program;
  return (
    <>
      <h1>{workout.name}</h1>
      <ul>
        {we.length > 0 && we.map(we => {
          const exercise = we.exercise
          return (
            <li key={exercise.id}>
              {exercise.name}
            </li>
          )
        })}
      </ul>
      <button type="button" onClick={handleStart}>Start Workout</button>
    </>
  )
}