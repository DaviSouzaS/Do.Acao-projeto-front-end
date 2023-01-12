import { useContext } from "react";
import { DonationContext } from "../../contexts/DonationContext";
import { UserContext } from "../../contexts/UserContext";
import { StyledTypography } from "../BaseTypography/style";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { ImageCategories } from "../ImageCategories";
import { StyledCard } from "./styles";
import { IconName, MdOutlineEdit } from "react-icons/md";

export interface IElement {
  userId: number;
  title: string;
  category: string;
  validation: string;
  descripition: string;
  amounts: number;
  id: number;
  address: {
    city: string;
    state: string;
  };
}

interface icard {
  element: IElement;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditDonor: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CardDonor = ({ element, setModal, setEditDonor }: icard) => {
  const { title, category, id, address } = element;
  console.log(element)
  const { getDonationbyId } = useContext(DonationContext);
  const { isDonor } = useContext(UserContext);
  
  const openModal = async () => {
    setModal(true);
    const state = await getDonationbyId(id);
    setModal(state);
  };
  return (
    <StyledCard>
      <ImageCategories category={category} />
      <div>
        <StyledTypography classText="Heading4" tag="h3">
          {title}
        </StyledTypography>
        <StyledTypography classText="Body" tag="p">
          {category}
        </StyledTypography>
        <StyledTypography classText="Body" tag="p">
          {address.city} | {address.state}
        </StyledTypography>
        <div id="btn">
          <button id="icon" onClick={openModal}>
            Detalhes
          </button>
           {isDonor && <button id="icon" onClick={() => setEditDonor(true)}>
            <MdOutlineEdit />
          </button>} 
        </div>
      </div>
    </StyledCard>
  );
};
