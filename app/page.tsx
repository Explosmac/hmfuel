import MuiPage from "src/app/mui_page"
import prisma from "src/lib/prisma"
import ProviderWrap from "./provider_wrap"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"

export type HomeProps = Awaited<ReturnType<typeof homePageRequest>>

export const revalidate = 600

const Home = async () => {
  const allProps = await homePageRequest()
  return (
    <ProviderWrap>
      <MuiPage {...allProps} />
    </ProviderWrap>
  )
}

const homePageRequest = async () => {
  const data = await getServerSession(authOptions)
  const cars = await prisma.car.findMany({
    where: {
      owner: {
        email: data?.user?.email || undefined
      }
    }
  })
  return { cars }
}

export default Home
