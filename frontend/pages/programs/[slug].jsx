import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link';
import React from 'react'
import SingleProgram from '../../components/SingleProgram';



const SINGLE_PROGRAM_QUERY = gql`
  query SINGLE_PROGRAM_QUERY{
    programs(where:{
      slug: "4-weeks-of-the-prep"
    }) {
      id
      name
    }
  }
`
export default function Program({ query }) {

  return (
    <div>
      <SingleProgram slug={query.slug}/>
    </div>
  )
}
