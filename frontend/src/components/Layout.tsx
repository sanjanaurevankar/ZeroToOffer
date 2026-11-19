import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>

      <Navbar />

      <div className="app-layout">

        <Sidebar />

        <main className="main-content">
          {children}
        </main>

      </div>

    </>
  );
};

export default Layout;