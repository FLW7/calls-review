import { MutableRefObject, Dispatch, SetStateAction } from "react";

const clickDropOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    setState: Dispatch<SetStateAction<boolean>>,
    action?: () => void
): (() => void) => {
    const handleClickOutside = (event: MouseEvent): void => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setState(false);
            if (action) action();
        }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
};

export default clickDropOutside;
