import { getDocuments } from "../../Document/Services/DocumentServices";

function Excecutive() {

    const testing = async () => {
        getDocuments();
    }

    return (
        <div>
            <h1>Executive</h1>
            <button onClick={testing}>Testing</button>
        </div>
    )
}

export default Excecutive;