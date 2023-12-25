import { FC } from "react";
import cl from "./errorPlug.module.scss";

interface ErrorPlugProps {
    text: string;
}

const ErrorPlug: FC<ErrorPlugProps> = ({ text }) => {
    return (
        <div className={cl.errorPlug}>
            <p className={cl.errorPlug__text}>{text}</p>
        </div>
    );
};

export default ErrorPlug;
