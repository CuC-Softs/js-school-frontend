import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

function Routes() {
    return (
        <BrowserRouter>
            <div>
                <AuthRoutes/>
            </div>
        </BrowserRouter>
    )
}

export default Routes;