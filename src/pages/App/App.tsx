import Calls from "../../components/CallsBlock/Calls";
import Header from "../../components/Header/Header";
import cl from "./app.module.scss";

function App() {
    return (
        <div className={cl.wrapper}>
            <Header />
            <Calls />
        </div>
    );
}

export default App;
