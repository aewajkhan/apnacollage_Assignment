// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Progress from "./pages/Progress";
// import Profile from "./pages/Profile";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./utils/PrivateRoute";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// // import Navbar from "./pages/Register";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <>
//                   <Navbar />
//                   <Dashboard />
//                 </>
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/progress"
//             element={
//               <PrivateRoute>
//                 <>
//                   <Navbar />
//                   <Progress />
//                 </>
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <PrivateRoute>
//                 <>
//                   <Navbar />
//                   <Profile />
//                 </>
//               </PrivateRoute>
//             }
//           />
          

//           <Route path="*" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes with Navbar + Footer */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <Layout>
                  <Progress />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <Profile />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
