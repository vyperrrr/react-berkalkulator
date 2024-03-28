import { Theme } from "@radix-ui/themes";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Theme
    accentColor="ruby"
    grayColor="mauve"
    radius="none"
    scaling="100%"
    panelBackground="translucent"
    appearance="dark"
  >
    <App />
  </Theme>,
);
