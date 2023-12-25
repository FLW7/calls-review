import { createRoot } from "react-dom/client";
import App from "./pages/App/App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./assets/styles/variables.scss";
import "./assets/styles/resetStyles.scss";
import "./assets/styles/main.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
