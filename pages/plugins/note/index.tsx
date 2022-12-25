// CONFIGS
import SETTING from "config/SETTINGS.json"
// STYLES
import s from "styles/PluginNote.module.scss";
// LIBS
import { v4 } from "uuid";

import Playground from "layouts/Playground";
import Icon from "components/Icon";
import { useEffect } from "react";


import db from "config/firebase";
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "@firebase/firestore";


const data = [
    {
        id: "1",
        title: "Notebooks",
        parent: "root",
    },
    {
        id: "2",
        parent: "1",
        title: "My blog",
        order: 1
    },
    {
        id: "3",
        parent: "2 1",
        title: "My blog sub folder",
        order: 2
    },
    {
        id: "4",
        parent: "3 2 1",
        title: "File item"
    }
];



const PluginNote = ({list = []}) => {

    useEffect(()=>{
        
        const colRef = collection(db, "notes");
        const q = query(colRef);
        const unsubscribe = onSnapshot(q,(snapshot)=>{

            console.log(snapshot);

            const list  =  snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
            console.log(list)
        });

        return unsubscribe ; 



        

    },[]);

    return (
        <Playground mode="note">
            <div className={s.pluginNote}>
                <div className={s.left}>
                    <ul>
                        <li>
                            <div className={s.title}>
                                <Icon name="note" size={14} color="#fff" style={{ marginTop: 4, marginRight: 7 }} />
                                <span>All Notes</span>

                            </div>
                            <div className={s.actions}></div>
                        </li>

                        <li className={s.indented1}>
                            <div className={s.title}>
                                <Icon name="right" size={14} color="#fff" style={{ marginTop: 0, marginRight: 7 }} />
                                <span>My Blog</span>

                            </div>
                            <div className={s.actions}>
                                <a>
                                    <Icon name="newFile" size={15} color="#fff" />
                                </a>
                                <a>
                                    <Icon name="newFolder" size={15} color="#fff" />
                                </a>

                            </div>
                        </li>
                        <li className={s.indented2}>
                            <div className={s.title}>
                                <Icon name="right" size={14} color="#fff" style={{ marginTop: 0, marginRight: 7 }} />
                                <span>My Blog sub folder</span>

                            </div>
                            <div className={s.actions}>
                                <a>
                                    <Icon name="newFile" size={15} color="#fff" />
                                </a>

                            </div>
                        </li>
                        <li className={s.indented3}>
                            <div className={s.title}>

                                <span>Items.tsx</span>

                            </div>

                        </li>

                        {
                            SETTING.NOTES.slice(1).map((item, index) => {
                                return (
                                    <li key={v4()}>
                                        <div className={s.title}>
                                            <div className="split-2">
                                                <Icon name={item?.icon} size={15} color="#fff" style={{ marginTop: 1, marginRight: 7 }} />
                                                <span>{item?.name}</span>
                                            </div>


                                        </div>
                                        <div className={s.actions}>
                                            <a>
                                                <Icon name="newFile" size={15} color="#fff" />
                                            </a>
                                            <a>
                                                <Icon name="newFolder" size={15} color="#fff" />
                                            </a>

                                        </div>
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>
                <div className={s.right}>
                    right
                </div>
            </div>
        </Playground>
    )
}


export default PluginNote; 