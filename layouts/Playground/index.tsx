// CONFIGS
import APP from "config/App.json";

// LIBS
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
// COMPONENTS
import Icon from "components/Icon";
import Header from "./Header";
import LoginGate from "./LoginGate";
import Footer from "./Footer";
import genURL from "ultils/genURL";

// IMPLEMENT CONCRETE 
interface PlaygroundProps {
    mode: string
    children: React.ReactNode
}
const Playground: NextPage<PlaygroundProps> = ({ mode = 'practice', children }) => {

    const { data: session } = useSession();
    const router = useRouter();

    const _moveTo = (strRoute: string) => {
        const URL = genURL(session?.user, strRoute);
        !session?.user ? alert('You need login first') : window.location.href = URL ? '/' + URL : '/';

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
                        {
                            APP.PLUGINS.slice(0, 10).map((plugin) => {
                                return (
                                    <li key={uuidv4()} title={plugin?.name} onClick={() => _moveTo(plugin?.alias)}>
                                        <a className={` ${mode === plugin.alias ? 'active' : 'none'} `}>
                                            <Icon name={plugin.icon} size={20} color="#fff" />
                                        </a>
                                    </li>
                                )
                            })
                        }


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