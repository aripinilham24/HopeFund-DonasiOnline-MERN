import { useNavigate } from "react-router-dom";
export const BackButton = ({className}) => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate(-1);
    }
    return(
        <button className={`btn btn-ghost normal-case text-xl ${className}`} onClick={handleButton}>Kembali</button>
    )
}