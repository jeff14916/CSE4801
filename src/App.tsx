import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import LogoutPage from "./Pages/LogoutPage";
import CameraInfo from "./Pages/CameraInfo";
import CameraRecommend from "./Pages/CameraRecommend";
import PhotoGuide from "./Pages/PhotoGuide";
import PhotoGallery from "./Pages/PhotoGallery";
import MyPage from "./Pages/MyPage";
import NotFoundPage from "./Pages/NotFoundPage";
import NavBar from "./NavBar";

const App = () => {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/camerainfo" element={<CameraInfo />} />
				<Route path="/camerarecommend" element={<CameraRecommend />} />
				<Route path="/photoguide" element={<PhotoGuide />} />
				<Route path="/photogallery" element={<PhotoGallery />} />
				<Route path="/mypage" element={<MyPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default App;
