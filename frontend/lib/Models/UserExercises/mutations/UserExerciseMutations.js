import gql from 'graphql-tag'

export const CREATE_USER_EXERCISE = gql`
  mutation CREATE_USER_EXERCISE(
      $exercise: ID!,
      $workout: ID!,
      $user: ID!,
    ){
    createUserExercise(input:{
      data:{
        exercise:$exercise,
        user:$user,
        workout:$workout
      }
    }){
    userExercise{
      reps
      weight
    }
  }
  }
`