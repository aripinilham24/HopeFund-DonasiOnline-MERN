import { useNavigate } from "react-router-dom";
export const BackButton = ({className}) => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate(-1);
    }
    return(
        <button className={`btn btn-ghost hover:bg-blue-500 border-none normal-case text-xl ${className}`} onClick={handleButton}><i className="bi bi-arrow-left"></i></button>
    )
}