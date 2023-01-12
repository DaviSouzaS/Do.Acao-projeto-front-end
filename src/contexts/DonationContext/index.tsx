import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { UserContext } from "../UserContext";
import { iUser } from "../UserContext/types";
import {
  iDonation,
  iDonationInfo,
  iDonationProviderProps,
  iDonationProviderValue,
} from "./types";

export const DonationContext = createContext({} as iDonationProviderValue);

export const DonationProvider = ({ children }: iDonationProviderProps) => {
  const [donations, setDonations] = useState<iDonation[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [filteredDonations, setFilteredDonations] = useState<iDonation[]>([]);
  const [donation, setDonation] = useState<iDonationInfo>({} as iDonationInfo);
  const [request, setRequest] = useState([] as iUser[]);
  const [myDonations, setMyDonations] = useState<iDonation[]>([]);
  const [filteredMyDonations, setFilteredMyDonations] = useState<iDonation[]>(
    []
  );
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem("TOKEN");

      if (!token) {
        return null;
      }
      try {
        const { data } = await api.get("donation/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setDonations(data);
        setFilteredDonations(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
    const getMyDonations = async () => {
      const token = localStorage.getItem("TOKEN");
      const userId = localStorage.getItem("USER");
      if (!token) {
        return null;
      }

      try {
        const { data } = await api.get(`donation?userId=${userId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setMyDonations(data);
        setFilteredMyDonations(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMyDonations();
  }, [user]);
  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem("TOKEN");

      if (!token) {
        return null;
      }
      try {
        const { data } = await api.get("donation/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setDonations(data);
        setFilteredDonations(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
    const getMyDonations = async () => {
      const token = localStorage.getItem("TOKEN");
      const userId = localStorage.getItem("USER");
      if (!token) {
        return null;
      }

      try {
        const { data } = await api.get(`donation?userId=${userId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setMyDonations(data);
        setFilteredMyDonations(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMyDonations();
  }, [reloadPage]);

  const getDonationbyId = async (id: number) => {
    setModalLoading(true);
    console.log(modalLoading);

    const token = localStorage.getItem("TOKEN");

    if (!token) {
      return false;
    }
    try {
      const { data } = await api.get(`donation/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setRequest(data);
      setDonation(data);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("algo errado aqui");
      return false;
    } finally {
      setModalLoading(false);
    }
  };

  const requestDonation = async (id: number) => {
    const token = localStorage.getItem("TOKEN");
    
    const body = {
    userId: request.userId,
    title: request.title,
    category: request.category,
    validation: request.validation,
    description: request.descripition,
    amounts: request.amounts,
    address: {
      city: request.city,
      state: request.state,
    },
    request: [...request.request, user]
  };
    if (!token) {
      return false;
    }
    try {
      await api.patch(`donation/${id}`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Sua Solicitação foi enviada!");
      return false;
    } catch (error) {
      console.error(error);
      return true;
    }
  };

  const sendDonation = async () => {

    setModalLoading(true)
    setReloadPage(!reloadPage)
    const token = window.localStorage.getItem("TOKEN");
    const id = donation.id;
    try {
      await api.delete(`donation/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Sua Doaçao foi Concluida");
    } catch (error) {
      console.log(error);
      toast.error("Algo errado por aqui");
    } finally {

      setModalLoading(false)
      setReloadPage(!reloadPage)
      return false

    }
  };
  const createDonation = async (data: any) => {
    const token = localStorage.getItem("TOKEN");
    const userId = localStorage.getItem("USER");
    const body = {
      userId: userId,
      title: data.title,
      category: data.category,
      validation: data.validation,
      description: data.descripition,
      amounts: data.amounts,
      address: {
        city: data.city,
        state: data.state,
      },
      request: []
    };
    if (!token) {
      return null;
    }

    try {
      const { data } = await api.post("donation/", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      
      toast.success("Doação adicionada com sucesso!");
      setReloadPage(!reloadPage)
    } catch (error) {
      console.error(error);
      toast.error("algo deu errado tente novamente!");
    }
  };

  const editQuantity = async (data: {
    amounts: number;
    id: number;
  }): Promise<void> => {
    try {
      const token = localStorage.getItem("TOKEN");

      await api.patch(`/donation/${data.id}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      toast.success("Quantidade alterada com sucesso!");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    } finally {
    }
  };
  const deleteDonation = async (id: number): Promise<void> => {
    try {
      const token = localStorage.getItem("TOKEN");

      await api.delete(`/donation/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      toast.success("Doação deletada com sucesso!");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    } finally {
    }
  };

  return (
    <DonationContext.Provider
      value={{
        donations,
        filteredDonations,
        setFilteredDonations,
        getDonationbyId,
        donation,
        setDonation,
        requestDonation,
        myDonations,
        filteredMyDonations,
        setFilteredMyDonations,
        request,
        sendDonation,
        modalLoading,
        setModalLoading,
        createDonation,
        editQuantity,
        deleteDonation,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
