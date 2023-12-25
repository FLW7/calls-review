import loaderSVG from "../../../assets/icons/loader.svg";
import cl from "./loader.module.scss";
const Loader = () => {
    return (
        <div className={cl.loader}>
            <img src={loaderSVG} alt="loader" />
        </div>
    );
};

export default Loader;
