import BookInfo from "./components/BookInfo"
import Bookmain from "./components/Bookmain"
import { Routes , Route } from "react-router-dom"

function App() {


  return (
    <>
     {/* <Bookmain /> */}
     <Routes>
      <Route path="/" element={<Bookmain />} />
      <Route path="/:id" element={<BookInfo />} />
     </Routes>

    </>
  )
}

export default App
