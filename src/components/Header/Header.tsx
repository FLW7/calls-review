import CallTypeSelector from "../CallsBlock/CallTypeSelector/CallTypeSelector";
import ClearFilters from "../CallsBlock/ClearFilters/ClearFiltersd";
import DateSelector from "../CallsBlock/DateSelector/DateSelector";
import cl from "./header.module.scss";

const Header = () => {
    return (
        <div className={cl.header}>
            <div className={cl.wrapper}>
                <CallTypeSelector />
                <ClearFilters />
            </div>
            <DateSelector />
        </div>
    );
};

export default Header;
