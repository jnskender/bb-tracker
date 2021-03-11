import { useMutation, useQuery } from '@apollo/client'
import { useSession } from "next-auth/client"
import gql from 'graphql-tag'
import Link from 'next/link';
import React from 'react'
import { CREATE_USER_EXERCISE, UPDATE_USER_EXERCISE } from "../lib/Models/UserExercises/mutations/UserExerciseMutations"
import { SINGLE_USER_EXERCISE_QUERY } from "../lib/Models/UserExercises/queries/UserExerciseQueries"
import { useRouter } from "next/router"
import useForm from '../lib/useForm';


export default function UserExercise({ id, order, workout, exercise }) {
  const [session, sessionLoading] = useSession();
  const currentOrder = parseInt(order)

  const router = useRouter();

  const { data, loading, error } = useQuery(SINGLE_USER_EXERCISE_QUERY, {
    variables: {
      id,
      workout,
      exercise,
      user: session?.id
    }
  })
  console.log(data)
  const hasDoneBefore = data?.userExercises.length > 0;
  const currentExercise = data?.workoutExercises.find((workoutExercise) => workoutExercise.order === currentOrder) || null;
  const nextExercise = data?.workoutExercises.find((workoutExercise) => workoutExercise.order === currentOrder + 1) || null;
  const previousExercise = data?.workoutExercises.find((workoutExercise) => workoutExercise.order === currentOrder - 1) || null;

  const formDefault = hasDoneBefore ? data.userExercises[0] : { reps: 0}
  const { inputs, handleChange, clearForm, resetForm } = useForm(formDefault)
  const [createUserExercise] = useMutation(
    CREATE_USER_EXERCISE
  )
  const [updateUserExercise] = useMutation(
    UPDATE_USER_EXERCISE
  )

  const handleNext = async (e) => {
    e.preventDefault();
    await updateUserExercise({
      variables: { id, reps: inputs.reps }
    });
    if (!nextExercise) {
      router.push('/')
      return
    }
    await createUserExercise({
      variables: {
        exercise: nextExercise.exercise.id,
        workout: data.userExercise.workout.id,
        user: session.id
      }
    }).then(({ data }) => {
      clearForm();
      router.push(`/user-exercise/${data.createUserExercise.userExercise.id}?order=${nextExercise.order}&workout=${workout}&exercise=${nextExercise.exercise.id}`)
    })
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      <form onSubmit={handleNext}>
        <h1>{data.userExercise.exercise.name}</h1>
        <label htmlFor="reps">Reps</label>
        <input type="number" inputMode="numeric" pattern="[0-9]*" name="reps" value={inputs.reps} onChange={handleChange} />
        <button type="submit">Next Exercise</button>
      </form>
    </div>
  )
}