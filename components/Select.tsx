import React, { useEffect, useState, useRef } from "react";
import useClickOutSide from "hooks/useClickOutSide";


export interface iItem {
    code: string
    value: string
}
interface SelectProp {

    defaultValue?: string
    data: iItem[],
    onSelected: (item: iItem) => void
}

const Select: React.FC<SelectProp> = (props) => {

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
        <div ref={refSelect} className="dropdown">
            <button onClick={_toggle} className="btn btn-select" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.data?.length > 0 && props?.data?.find((i) => i.code === localState.defaultValue)?.value}

                <i style={{ fontSize:9}} className="ml-3 fa fa-caret-down"></i>
                
            </button>
            <div className={`dropdown-menu ${localState.isShow ? 'show' : 'hide'}`} aria-labelledby="dropdownMenuButton">
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

export default Select