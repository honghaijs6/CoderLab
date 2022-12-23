
//LIBS
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

import Icon from "components/Icon";
import Modal from "components/Modal";
import { useState } from "react";


const Header = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [localState, setLocalState] = useState({
        isOpen: false
    })


    const _toggleModal = () => {
        setLocalState((prev) => {
            return {
                ...prev,
                isOpen: !prev.isOpen
            }
        })
    }
    const _nav = (route = '') => {

        if (!session) {
            _toggleModal();
            return true
        }

        router.push(`${route}/${String(session?.user?.email).split('@')[0]}`)
    }
    return (
        <div className="site-header">

            <Modal
                onToggle={_toggleModal}
                isOpen={localState.isOpen}
                title="CoderLab"
                isFooter={false}
            >
                <div className="box-center">
                    <div>
                        <h4>Please tring login using your google account</h4>
                        <br />


                        <button onClick={() => signIn('google')} className="btn btn-primary">
                            Login with google
                        </button>
                    </div>
                </div>

            </Modal>
            <div className="container flex" style={{ position: 'relative' }}>
                <div className="LOGO">
                    <span className="text-organge">{`<CoderLab/>`}</span>
                </div>
                <div className="NAV" >
                    <a onClick={() => _nav('practice')}>
                        <Icon name="coffee" size={22} />
                        Practice
                    </a>

                    <a onClick={() => _nav('challenge')}>
                        <Icon name="challenge" size={25} />
                        Challenge
                    </a>



                    {
                        session ? (
                            <a onClick={() => signOut()} >
                                <img src={session?.user?.image || ""} />
                                <span className="ml-3">Sign out</span>
                            </a>
                        ) : (
                            <a onClick={() => signIn('google')} >
                                <i className="fa fa-user mr-3 text-organge" /> Sign In with Google
                            </a>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Header