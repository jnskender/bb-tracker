import gql from "graphql-tag";

export const WORKOUT_EXERCISE_BY_WORKOUT = gql`
  query WORKOUT_EXERCISE_BY_WORKOUT($workout: ID!){
      workoutExercises(where: {
        workout: $workout
      }){
     exercise{
        id
        name
    }
    order
  }
  }`