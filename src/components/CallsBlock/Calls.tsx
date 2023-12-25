import cl from "./calls.module.scss";
import CallsList from "./CallsList/CallsList";

const Calls = () => {
    return (
        <div className={cl.calls}>
            <CallsList />
        </div>
    );
};

export default Calls;
