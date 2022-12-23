// DUMMY DATA

import QUESTIONS from 'config/data';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { encode, decode } from "ultils/base64";

import { useEffect, useState } from 'react';

export type questionType = {
    Desc: string;
    Examples: string[];
    Editor: string;
};

export interface IQuestion {
    Id: number;
    Title: string;
    Question: questionType;
    Level: string;
    Topic: string;
}

interface IlocalState {
    curQuestionId: number;
    questions: IQuestion[];
}

interface ILeftSide {
    mode: string;
    onSelected(data: IQuestion | null): void;
}
const LeftSide: NextPage<ILeftSide> = ({ mode = 'practice', onSelected }) => {



    const [localState, setLocalState] = useState<IlocalState>({
        curQuestionId: 0,
        questions: [],
    });

    const router = useRouter();

    useEffect(() => {
        if (mode) {

            try {
                const mix: any = {
                    none: 'easy',
                    practice: 'easy',
                    challenge: 'medium',
                };

                if (router?.query?.qid) {
                    const id = String(router?.query?.qid).split('-')[1] || 0;
                    const info = QUESTIONS.find(i => i.Id == id) || null;

                    setLocalState((prev: any) => {
                        return {
                            ...prev,
                            questions: QUESTIONS.filter(i => i.Level === mix[mode || 'none']),
                            curQuestionId: id,
                        };
                    });
                    onSelected(info);

                    return
                }

                // LOAD QUESTION BY MODE 
                setLocalState(prev => {
                    return {
                        ...prev,
                        questions: QUESTIONS.filter(i => i.Level === mix[mode || 'none']),
                    };
                });
            } catch { }

        }
    }, [mode, router?.query?.pid]);

    const _onSelect = (item: IQuestion | undefined) => {
        if (item) {
            setLocalState(prev => { 
                return {
                    ...prev,
                    curQuestionId: item?.Id,
                };
            });  

            const pid = Math.random().toString(36).slice(2) + '-' + String(item?.Id);
            router.push('/' + mode + '/' + router?.query?.user + '?qid=' + pid);

            onSelected(item);
        }
    };

    const _moveBack = () => {
        setLocalState(prev => {
            return {
                ...prev,
                curQuestionId: 0,
            };
        });
        onSelected(null);
        router.push('/' + mode + '/' + router?.query?.user);
        

    };

    const info = localState?.curQuestionId !== 0 ? localState?.questions.find(i => i.Id == localState?.curQuestionId) : null;
    return (
        <div className="side-left">
            {/* TAB BAR */}
            <div className="tabs">
                {localState.curQuestionId === 0 ? (
                    `Questions`
                ) : (
                    <a onClick={_moveBack}>
                        <i className="fa fa-angle-left mr-2" /> Back
                    </a>
                )}
            </div>

            {/* QUESTION LIST */}
            <div className={`list ${localState?.curQuestionId === 0 ? 'show' : 'hide'} `}>
                <ul>
                    {localState.questions.map((item, index) => {
                        return (
                            <li key={index} onClick={() => _onSelect(item)}>
                                <h3>{item?.Title}</h3>
                                <span className="badge badge-secondary">{item?.Level}</span>
                                <span className="badge badge-info ml-2">{item?.Topic}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* QUESTION FULL CONTENT */}
            {info && (
                <div className={`desc ${localState?.curQuestionId === 0 ? 'hide' : 'show'} `}>
                    <h4>{info?.Title}</h4>

                    <div className="question-desc" dangerouslySetInnerHTML={{ __html: info?.Question?.Desc }} />

                    {info?.Question?.Examples.map((ex, index) => {

                        const imgSrc = ex.indexOf('[image:') > -1 ? ex.split('[image:')[1].split('/]')[0] : '';
                        ex = ex.replace("[image:", '<p class="hide">').replace("/]", "</p>");
                        return (
                            <div key={index}>
                                <h4>Example {index + 1}</h4>
                                {imgSrc !== '' && <img style={{ maxWidth: 300 }} src={imgSrc} />}
                                <pre className="example-item mt-2" key={index} dangerouslySetInnerHTML={{ __html: ex }} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LeftSide;
