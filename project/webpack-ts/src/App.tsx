import Home from './views/home/Home'
import Shaking from './views/shaking/Shaking'
import moment from 'moment'
import Route from '@/components/Route'

export default function App() {
  console.log(process.env.NODE_ENV, moment().format('YYYY-MM-DD HH:mm:ss'))

  return (
    <div className="app-wrap">
      <Route path="/home" element={<Home />}></Route>
      <Route path="/shaking" element={<Shaking></Shaking>}></Route>
    </div>
  )
}
