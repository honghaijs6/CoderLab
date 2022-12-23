
// LIBS
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import 'react-toastify/dist/ReactToastify.css';



// COMPONENTS
import Icon from "components/Icon";
import Header from "./Header";
import LoginGate from "./LoginGate";
import Footer from "./Footer";

// IMPLEMENT CONCRETE 
interface PlaygroundProps {
    mode: string
    children: React.ReactNode
}
const Playground: NextPage<PlaygroundProps> = ({ mode = 'practice', children }) => {

    const { data: session } = useSession();
    const router = useRouter();

    const _moveTo = (strRoute: string) => {
        router.push('/' + strRoute + '/' + router?.query?.user)
    }



    if (!session) return <LoginGate />

    return (
        <div className="PLAYGROUND">

            {/* HEADER SITE */}
            <Header mode={mode} />

            {/* MAIN WORK PLACE */}
            <div className="workplace">
                <div className="left-bar">
                    <ul>
                        <li onClick={() => _moveTo('practice')}>
                            <a className={` ${mode === 'practice' ? 'active' : 'none'} `}>
                                <Icon name="coffee" size={20} color="#fff" />
                            </a>
                        </li>
                        <li onClick={() => _moveTo('challenge')}>
                            <a className={` ${mode === 'challenge' ? 'active' : 'none'} `}>
                                <Icon name="challenge" size={20} color="#fff" />
                            </a>
                        </li>
                        <li onClick={() => _moveTo('battle')}>
                            <a className={` ${mode === 'battle' ? 'active' : 'none'} `}>
                                <Icon name="knife" size={20} color="#fff" />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="frame">
                    {children}
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Playground; 