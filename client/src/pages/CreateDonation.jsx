import { Title } from "react-head";
import { api } from "../api/axios";

const CreateDonation = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api.post("/campaigns/create",{
                // data campaign
            });
            console.log(res.data);
        } catch (error) {
            console.error({error
            })
        }

    }
    return (
        <>
        <Title>Buat Campaign</Title>
        <div className="mt-25 lg:mt-10">
            <form onSubmit={handleSubmit}>
                <h1>Buat Campaign</h1>

            </form>
        </div>
        </>
    )
}

export default CreateDonation;