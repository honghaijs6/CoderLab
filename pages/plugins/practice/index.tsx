
// LIBS
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

import Playground from "layouts/Playground";
import PlayBox from 'components/playbox/PlayBox';

const MODE = 'practice'


const Practice = () => {
    const { data: session } = useSession();


    const sessionId = String(session?.user?.email).split('@')[0].replace(/\./g, '') + MODE
    return (
        <Playground mode={MODE}>
            <PlayBox mode={MODE} userInfo={session?.user} sessionId={sessionId} />
        </Playground>
    )

}

export default Practice 