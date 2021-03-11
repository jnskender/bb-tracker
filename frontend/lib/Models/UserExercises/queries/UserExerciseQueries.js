import gql from "graphql-tag";

export const SINGLE_USER_EXERCISE_QUERY = gql`
  query SINGLE_USER_EXERCISE_QUERY($id: ID!, $workout: ID!, $user: ID!, $exercise: ID!){
      userExercise(id: $id)
    {
      id,
      workout{
        id
        name
      }
      exercise{
        id
        name
      }
      reps,
      weight
    }
    workoutExercises(sort:"order:asc", where:{
      workout: $workout
    }){
    exercise{
      name,
      id
   }
  order
  }
  userExercises(sort: "createdAt:desc", limit:1, where:{
  user: $user
  exercise: $exercise,
  reps_null:false
}){
	reps
  weight
}
}`

export const PREVIOUS_USER_EXERCISE_QUERY = gql`
query PREVIOUS_USER_EXERCISE_QUERY($user: ID!, $exercise: ID!){
  userExercises(where:{
  user:$user
}){
	reps
  weight
}
}
`