import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Layout = ({ children }) => {
  return (
    <>

    <div className="fixed top-0 left-0 w-full z-10">

      <Navbar />
    </div>
      <main className="min-h-[calc(100vh-128px)] mt-[60px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
