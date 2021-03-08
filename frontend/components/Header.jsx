import React from 'react'
import Link from "next/link"
import { useSession } from "next-auth/client"

export default function Header() {
  const [session, loading] = useSession()
  console.log({session})
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {session &&
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          }
          {!session &&
            <li>
              <Link href="/api/auth/signin">Signin</Link>
            </li>
          }
        </ul>
      </nav>
    </div>
  )


}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};