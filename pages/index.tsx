import type { NextPage } from 'next'
import { TriStateSwitch } from './components/TriStateSwitch'

const Home: NextPage = () => {
  return (
    <main>
      <TriStateSwitch name='Filter 1'/>
      <TriStateSwitch name='Filter 2'/>
      <TriStateSwitch name='Filter 3'/>
    </main>
  )
}

export default Home
