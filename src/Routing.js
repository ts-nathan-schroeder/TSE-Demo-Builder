import { render } from "@testing-library/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import IQVIA from "./IQVIA";

function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App></App>}></Route>
                <Route path="/IQVIA" element={<IQVIA></IQVIA>}> </Route>
            </Routes>
        </BrowserRouter>

    )
}
export default Routing;