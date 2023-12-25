import { FC } from "react";
import cl from "./emptyPlug.module.scss";

interface EmptyPlugProps {
    text: string;
}

const EmptyPlug: FC<EmptyPlugProps> = ({ text }) => {
    return (
        <div className={cl.emptyPlug}>
            <p className={cl.emptyPlug__text}>{text}</p>
        </div>
    );
};

export default EmptyPlug;
