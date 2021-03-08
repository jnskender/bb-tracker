import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link';
import React from 'react'

const ALL_PRODUCTS_QUERY = gql`
  query getPrograms {
    programs {
      id,
      name,
      slug
    }
  }
`
export default function Programs() {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <div>
      Programs
      <ul>
        {data.programs.map(program => {
          return (
            <li key={program.id}>
              <Link href={`/programs/${program.slug}`}>{program.name}</Link>
            </li>
          )
        })}

      </ul>
    </div>
  )
}
