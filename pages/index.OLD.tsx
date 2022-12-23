
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();


  if (session) {

    console.log(session)
    return (
      <div>
        <p>{session.user?.email}</p>
        <button className="btn btn-success" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }


  return (
    <div className='app'>
      <div style={{ display: 'grid', height: 200, placeItems: 'center' }}>
        <p className='text-white display-1'>
          Improve your skills
        </p>
        


        {/**<p>
          <button onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/session?id=123' })} className="btn btn-success">
            Sign In
          </button>
        </p>
  */}

      </div>
    </div>
  )
}

