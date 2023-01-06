import { CardInformation } from "../../Components/CardInformation"
import { CategoriesMenu } from "../../Components/CategoriesMenu"
import { Header } from "../../Components/Header"
import { aliments } from "../../services/base"
import { IElement } from "../DashboardDonor"
import register from "../../assets/icons/register.png"
import donate from "../../assets/icons/donate.png"
import warm from "../../assets/icons/warm.png"
import { StyledDashboardReceiver } from "./styled"
import { Footer } from "../../Components/footer"
import { CardDonor } from "../../Components/CardDonor"

export const DashboardReceiver = () => {
    return (
        <StyledDashboardReceiver>
            <Header />
      <section className="container">
        <CardInformation img={register} value="1" text="Registre-se no do.Ação" />
        <CardInformation img={donate} value="2" text="Cadastre sua doação" />
        <CardInformation img={warm} value="3" text="Aqueça seu coração com uma doação bem-sucedida" />
      </section>
      <section className="container">
        <ul>
          {
            aliments.map((element: IElement) =>
              <CardDonor element={element} key={element.id} />)
          }
        </ul>
        <CategoriesMenu />
      </section>
      <Footer />
        </StyledDashboardReceiver>
    )
}