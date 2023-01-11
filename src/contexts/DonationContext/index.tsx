import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { UserContext, UserProvider } from "../UserContext";
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
  const [filteredDonations, setFilteredDonations] = useState<iDonation[]>([]);
  const [donation, setDonation] = useState<iDonationInfo>({} as iDonationInfo)
  const [request, setRequest] = useState([] as iUser[])
  const [myDonations, setMyDonations] = useState<iDonation[]>([]);
  const [filteredMyDonations, setFilteredMyDonations] = useState<iDonation[]>([]);
  const { user, setOpenModal } = useContext(UserContext)

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem("TOKEN");

      if (!token) {
        return null
      }
      try {
        const { data } = await api.get('donation/', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setRequest(data.request)
        setDonations(data)
        setFilteredDonations(data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [])
  const getDonationbyId = async (id: number) => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      return null
    }
    try {
      const { data } = await api.get(`donation/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setDonation(data)
      setOpenModal(true)
    } catch (error) {
      console.error(error)
    }
  }

  const requestDonation = async (user: iUser , id: number) => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      return null
    }
    try {
      await api.patch(`donation/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        data: [
          {
            requests: user
          },
        ]
      })
      toast.success("Sua Solicitação foi enviada!");
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getMyDonations = async () => {
      const token = localStorage.getItem("TOKEN");
      const userId = localStorage.getItem('USER')
      if (!token) {
        return null
      }

      try {
        const { data } = await api.get(`donation?userId=${userId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        setMyDonations(data)
        setFilteredMyDonations(data)
      } catch (error) {
        console.error(error)
      }
    }
    getMyDonations()
  }, [])


  return (
    <DonationContext.Provider value={{
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
      user,
      request
    }}>
      {children}
    </DonationContext.Provider>
  );
};