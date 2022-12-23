
// CONFIGS
import SETTING from "config/SETTINGS.json";


// LIBS
import { NextPage } from "next";
import { useRouter } from "next/router";

// DEPENDENCIES
import { HeaderState } from "./Header"


export interface Iexpert {
    id: number
    email: string
    name: string
    level: string
    follower: number
    image: string
}


export interface InviteFormProps {
    localState: HeaderState
    onChange: (key: string, value: string) => void
    copyLink: () => void
    onSendInvite: (item: Iexpert) => void
}

const InviteForm: NextPage<InviteFormProps> = ({ localState, onChange, copyLink }) => {

    const router = useRouter();

    if (!router?.query?.qid) return (
        <div style={{ textAlign: 'center', fontSize:16 }}>
            You need to select question first then invite your {localState?.inviteTo}
        </div>
    )

    return localState?.inviteTo === 'friend' ? (
        <form>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input value={localState?.email} onChange={(e) => onChange('email', e.target.value)} type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Your friend name</label>
                <input value={localState?.fullName} onChange={(e) => onChange('fullName', e.target.value)} type="text" className="form-control" id="email" placeholder="Enter your friend name" />
            </div>
            <div className="form-group">
                {!localState?.isCopy ? (
                    <a className="cursor text-organge" onClick={copyLink}>
                        <i className="fa fa-link mr-2" /> Copy invite link
                    </a>
                ) : (
                    <a className="text-organge">
                        <i className="fa fa-check mr-2" /> Copied
                    </a>
                )}
            </div>
        </form>
    ) : (
        <div className="user-list">
            <ul>
                {
                    SETTING.EXPERTS.map((item: any, index: number) => {
                        return (
                            <li key={index} className="split-2" style={{ justifyContent: 'space-between' }}>
                                <div className="item" style={{ width: '70%' }}>
                                    <div className="user-info split-2">
                                        <img className="item" style={{ width: 40 }} src={item?.image} />
                                        <div className="item ml-3"  >
                                            <h4>{item?.name}</h4>
                                            <label className="badge badge-secondary mr-3 thin">{item?.level}</label>
                                            <label> <i className="fa fa-users mr-1" /> Follower : {item?.follower}</label>

                                        </div>
                                    </div>
                                </div>
                                <div className="item" style={{ textAlign: 'right', width: '30%' }}>
                                    <button className="btn btn-sm-1x">
                                        Invite
                                    </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default InviteForm