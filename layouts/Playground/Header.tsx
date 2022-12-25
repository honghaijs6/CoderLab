// CONFIGS - HELPER
import SETTING from "config/SETTINGS.json"
import validateEmail from "ultils/validateEmail";
import doInvite from "services/doInvite";

// LIBS
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// COMPONENTS
import DDButton from "components/DDButton";
import { useState } from "react";
import Modal from "components/Modal";
import InviteForm, { Iexpert } from "./InviteForm";
import Icon from "components/Icon";




export interface HeaderProps {
    mode: string
}

export interface HeaderState {
    isOpenInvite: boolean,
    inviteTo: 'friend' | 'expert',
    email: string,
    fullName: string,
    isCopy: boolean
}
const Header: NextPage<HeaderProps> = ({ mode, }) => {

    const router = useRouter();
    const { data: session } = useSession();

    const [localState, setLocalState] = useState<HeaderState>({
        isOpenInvite: false,
        inviteTo: 'friend',
        email: '',
        fullName: '',
        isCopy: false
    });

    const _genLink = () => {


        return SETTING.APP_URL + '/' + mode + '/' + String(session?.user?.email).split('@')[0] + '?qid=' + router?.query?.qid;


    }
    const _whereStateChange = (key: string, value: string | boolean) => {
        setLocalState(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const _toggleModal = (inviteTo: string) => {
        setLocalState((prev: any) => {
            return {
                ...prev,
                isOpenInvite: !prev.isOpenInvite,
                inviteTo,
                isCopy: false,
                email: ''
            }
        })
    }

    const _copyLink = () => {
        navigator.clipboard.writeText(String(_genLink()));
        _whereStateChange('isCopy', true)
    }

    const _sendInvite = async () => {
        try {
            await doInvite({
                SenderName: session?.user?.name || "sir/madam",
                Email: localState?.email,
                ToName: localState?.fullName,
                LinkInvite: _genLink()
            });
            _toggleModal(localState?.inviteTo);


        } catch { }
    }


    const _doSendInviteExpert = async (data: Iexpert) => {
        try {

            await doInvite({
                SenderName: session?.user?.name || "sir/madam",
                Email: data?.email,
                ToName: data?.name,
                LinkInvite: _genLink()

            })

        } catch { }
    }

    return (
        <div className="header">

            <Modal
                onToggle={() => _toggleModal('friend')}
                title={`${SETTING?.INVITE.find(i => i.code === localState?.inviteTo)?.value} `}
                isOpen={localState?.isOpenInvite}
                submitText={'Send invite'}
                onSubmit={_sendInvite}
                disabled={!validateEmail(localState?.email)}
                isFooter={localState?.inviteTo === 'friend'}

            >
                <InviteForm
                    onSendInvite={(data) => _doSendInviteExpert(data)}
                    localState={localState}
                    onChange={(field, value) => _whereStateChange(field, value)}
                    copyLink={_copyLink}
                />


            </Modal>
            <div className="branding text-organge">
                <div onClick={() => router.push('/')} className="icon">
                    <Icon name={'code'} size={22} color="#fff" />

                </div>
                <div className="title" style={{ fontWeight:'300'}}>
                    {mode}
                </div>
            </div>
            <div className="user-tool text-organge">
                {
                    session ? (
                        <ul>
                            <li className="mr-5">
                                <DDButton
                                    data={SETTING?.INVITE}
                                    defaultValue={'friend'}
                                    onSelected={(item) => {
                                        _toggleModal(item?.code)
                                    }}
                                />

                            </li>

                            <li>
                                <a>
                                    <i className="fa fa-bell text-white" />
                                </a>
                            </li>
                            <li >
                                {session && (
                                    <div>
                                        <img src={session?.user?.image || ""} />
                                        <label className="ml-2">{String(session?.user?.name)}</label>
                                    </div>

                                )}
                            </li>
                            <li>
                                <a>
                                    <i className="fa fa-bars" />
                                </a>
                            </li>
                        </ul>
                    ) : <button onClick={() => signIn('google')} className="btn btn-sm-1x"> Sign in with Google </button>
                }

            </div>
        </div>
    )
}

export default Header; 