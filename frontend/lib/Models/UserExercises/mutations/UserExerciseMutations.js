import gql from 'graphql-tag'

export const CREATE_USER_EXERCISE = gql`
  mutation CREATE_USER_EXERCISE(
      $exercise: ID!,
      $workout: ID!,
      $user: ID!,
      $reps: Int,
      $weight: Int
    ){
    createUserExercise(input:{
      data:{
        exercise:$exercise,
        user:$user,
        workout:$workout,
        reps: $reps,
        weight: $weight
      }
    }){
    userExercise{
      id
      reps
      weight
    }
  }
  }
`

export const UPDATE_USER_EXERCISE = gql`
  mutation UPDATE_USER_EXERCISE(
      $id: ID!,
      $exercise: ID,
      $workout: ID,
      $user: ID,
      $reps: Int,
      $weight: Int
    ){
    updateUserExercise(input:{
      where: {
        id: $id
      }
      data:{
        exercise:$exercise,
        user:$user,
        workout:$workout,
        reps: $reps,
        weight: $weight
      }
    }){
    userExercise{
      id
      reps
      weight
    }
  }
  }
`