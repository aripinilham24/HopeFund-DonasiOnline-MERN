import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const BackButton = ({ className }) => {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate(-1);
  }
  return (
    <Button variant="outline" className={className} onClick={handleButton}>
      <ArrowLeft className="h-4 w-4" />
      Kembali
    </Button>
  )
}
