import { useEffect } from "react";

const useClickOutSide = (myRef: any, setState = Object()) => {


    try {
        useEffect(() => {
            const handleClickOutside = (e: any) => {
                try {
                    if (!myRef.current.contains(e.target)) {

                        setState((prev: any) => {
                            return {
                                ...prev,
                                isShow: false,
                            };
                        });

                    }
                } catch (err) { }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        });
    } catch (err) {
        alert("shit happening at useClickOutSide " + err);
    }
};

export default useClickOutSide;
