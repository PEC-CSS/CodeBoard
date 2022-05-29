import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
import EditorPage from "./Components/EditorPage";

function App() {
  return (
    <>
      <div>
        
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
