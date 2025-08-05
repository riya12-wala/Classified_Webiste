import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/slice/store.js";
import ContextStore from "./sections/AddyourBusiness/ContextStore.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ContextStore>
        <App />
      </ContextStore>
    </Provider>
  </StrictMode>
);
