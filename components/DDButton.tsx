import React, { useEffect, useState, useRef } from "react";
import useClickOutSide from "hooks/useClickOutSide";


export interface iItem {
    code: string
    value: string
}
interface DDButtonProps {

    defaultValue?: string
    data: iItem[],
    onSelected: (item: iItem) => void
}

const DDButton: React.FC<DDButtonProps> = (props) => {

    const [localState, setLocalState] = useState({
        isShow: false,
        defaultValue: '',
    });

    const refSelect = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props?.defaultValue) {
            _onChange("defaultValue", props?.defaultValue)
        }
    }, [props.defaultValue]);

    useClickOutSide(refSelect, setLocalState);

    const _toggle = () => {
        _onChange('isShow', !localState.isShow)
    }

    const _onChange = (field: string, value: string | boolean) => {
        setLocalState(prev => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const _onSelect = (item: iItem) => {
        setLocalState(prev => {
            return {
                ...prev,
                defaultValue: item.code,
                isShow: !prev.isShow
            }
        });

        props.onSelected(item)
    }

    return (
        <div className={`btn-group`} ref={refSelect}>
            <button type="button" onClick={_toggle} className="btn btn-primary">
                {props.data?.length > 0 && props?.data?.find((i) => i.code === localState.defaultValue)?.value}
            </button>

            <button type="button" onClick={_toggle} className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className={`dropdown-menu ${localState.isShow ? 'show' : 'hide'}`}>
                {
                    props?.data && props?.data.map((item: iItem, index) => {
                        return (
                            <a key={index} onClick={() => _onSelect(item)} className="dropdown-item cursor">{item?.value}</a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DDButton