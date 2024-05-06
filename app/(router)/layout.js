import Footer from "./_components/Footer"
import Header from "./_components/Header"
import Sidebar from "./_components/Sidebar"

function layout({children}) {
  return (
    <main>
      <div className="sm:w-64 sm:block hidden fixed">
        <Sidebar/>
      </div>
      <div className="ml-64">
        <Header/>
        {children}
        <Footer/>
      </div>
    </main>
  )
}

export default layout