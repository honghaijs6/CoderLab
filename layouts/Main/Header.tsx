
// HELPERS 
import APP from "config/App.json";
import genURL from "ultils/genURL";


//LIBS
import { v4 as uuidv4 } from "uuid"
import { signOut, signIn, useSession } from "next-auth/react";


// COMPONENTS
import Icon from "components/Icon";
import Modal from "components/Modal";
import { useState } from "react";



const Header = () => {

    const { data: session } = useSession();

    const [localState, setLocalState] = useState({
        isOpen: false
    });

    const _toggleModal = () => {
        setLocalState((prev) => {
            return {
                ...prev,
                isOpen: !prev.isOpen
            }
        })
    }
    const _nav = (route = '') => {
        const URL = genURL(session?.user, route);
        !session?.user ? _toggleModal() : window.location.href = URL ? URL : '/'
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
                        <div style={{ marginTop: 10 }}>
                            <button onClick={() => signIn('google')} className="btn btn-primary">
                                Login with google
                            </button>

                        </div>
                    </div>
                </div>

            </Modal>
            <div className="container flex" style={{ position: 'relative' }}>
                <div className="LOGO">
                    <span className="text-organge">{`<CoderLab/>`}</span>
                </div>
                <div className="NAV" >

                    {
                        APP.PLUGINS.slice(0, 2).map((plugin) => {
                            return (
                                <a key={uuidv4()} onClick={() => _nav(plugin?.alias)}>
                                    <Icon name={plugin?.icon} size={20} style={{ marginTop:5}} />
                                    {plugin?.name}
                                </a>
                            )
                        })
                    }




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