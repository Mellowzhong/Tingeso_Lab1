import FirstHomeForm from "../Components/FirstHomeForm";
import SecondHomeForm from "../Components/SecondHomeForm";
import ComercialPropertyForm from "../Components/ComercialPropertyForm";
import RemoldingForm from "../Components/RemoldingForm";

import { useState } from "react";

function Simulation() {
    const [showFirstHomeForm, setShowFirstHomeForm] = useState(false);
    const [showSecondHomeForm, setShowSecondHomeForm] = useState(false);
    const [showComercialPropertyForm, setShowComercialPropertyForm] = useState(false);
    const [showRemodelingForm, setShowRemodelingForm] = useState(false);

    return (
        <div className="grid">
            <label htmlFor="firstHome">
                {showFirstHomeForm ? `Ocultar first home form` : `Mostrar first home form`}
                <input type="checkbox" onClick={() => setShowFirstHomeForm(!showFirstHomeForm)} />
                {showFirstHomeForm && <FirstHomeForm className={showFirstHomeForm ? "show-element" : null} />}
            </label>
            <label htmlFor="secondHome">
                {showSecondHomeForm ? `Ocultar second home form` : `Mostrar second home form`}
                <input type="checkbox" onClick={() => setShowSecondHomeForm(!showSecondHomeForm)} />
                {showSecondHomeForm && <SecondHomeForm className={showSecondHomeForm ? "show-element" : null} />}
            </label>
            <label htmlFor="comercialProperty">
                {showSecondHomeForm ? `Ocultar comercial property form` : `Mostrar comercial property form`}
                <input type="checkbox" onClick={() => setShowComercialPropertyForm(!showComercialPropertyForm)} />
                {showComercialPropertyForm && <ComercialPropertyForm className={showComercialPropertyForm ? "show-element" : null} />}
            </label>
            <label htmlFor="remolding">
                {showSecondHomeForm ? `Ocultar remolding form` : `Mostrar remolding form`}
                <input type="checkbox" onClick={() => setShowRemodelingForm(!showRemodelingForm)} />
                {showRemodelingForm && <RemoldingForm className={showRemodelingForm ? "show-element" : null} />}
            </label>
        </div>
    );
}

export default Simulation;