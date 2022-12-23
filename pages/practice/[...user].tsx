
// LIBS
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

import Playground from "layouts/Playground";
import PlayBox from 'components/playbox/PlayBox';

const MODE = 'practice'
const Practice = () => {

    const { data: session } = useSession();

    /*const { status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            alert("hei man login now")
        },
    });
    */

    const router = useRouter()
    const { user } = router.query;

    return (
        <Playground mode={MODE}>
            <PlayBox mode={MODE} userInfo={session?.user} sessionId={String(user)} />
        </Playground>
    )
}

export default Practice;