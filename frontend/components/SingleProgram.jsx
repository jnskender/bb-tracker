import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link';
import React from 'react'



const SINGLE_PROGRAM_QUERY = gql`
  query SINGLE_PROGRAM_QUERY($slug: String!){
    programs(where:{
      slug: $slug
    }) {
      id
      name
      workouts {
        id,
        name
      }
    }
  }
`

export default function SingleProgramPage({ slug }) {
  const { data, loading, error } = useQuery(SINGLE_PROGRAM_QUERY, {
    variables: {
      slug
    }
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>
  const program = data.programs[0];
  const { workouts } = program;
  return (
    <>
      <h1>{program.name}</h1>
      <ul>
        {workouts.length > 0 && workouts.map(workout => {
          return (
            <li key={workout.id}>
              <Link href={`/workout/${workout.id}`}>
                {workout.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}