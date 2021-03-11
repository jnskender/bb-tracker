import { useMutation, useQuery } from '@apollo/client'
import { useSession } from "next-auth/client"
import gql from 'graphql-tag'
import Link from 'next/link';
import React from 'react'
import { CREATE_USER_EXERCISE } from "../lib/Models/UserExercises/mutations/UserExerciseMutations"
import { useRouter } from "next/router"

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
  const router = useRouter();
  const { data: workoutData, loading: workoutLoading, error: workoutError } = useQuery(
    SINGLE_WORKOUT_QUERY, {
    variables: {
      id
    }
  });

  const [createUserExercise] = useMutation(
    CREATE_USER_EXERCISE
  )

  if (workoutLoading) return <p>Loading...</p>
  if (workoutError) return <p>Error : {error.message}</p>


  const handleStart = async () => {
    const res = await createUserExercise({
      variables: {
        exercise: workoutData.workoutExercises[0].exercise.id,
        workout: workoutData.workouts[0].id,
        user: session.id
      }
    }).then(({data}) => {
      router.push(`/user-exercise/${data.createUserExercise.userExercise.id}?order=0&workout=${workoutData.workouts[0].id}&exercise=${workoutData.workoutExercises[0].exercise.id}
      `)
    })
  }
  return (
    <>
      <h1>{workoutData.workouts[0].name}</h1>
      <ul>
        {workoutData.workoutExercises.length > 0 && workoutData.workoutExercises.map(we => {
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