import React, { useEffect, useState } from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"

import HBLayout from "./layout/HBLayout"
import NHBLayout from "./layout/NHBLayout"
import PHBLayout from "./layout/PHBLayout"

// Pages
import PlayPage from "./pages/PlayPage"
import StatusPage from "./pages/StatusPage"
import PhotosPage from "./pages/PhotosPage"
import UserPage from "./pages/UserPage"
import StagePage from "./pages/StagePage"
import InitPage from "./pages/InitPage"
import OauthKakao from "./oauth/OauthKakao"
import OauthNaver from "./oauth/OauthNaver"
import Registration from "./oauth/Registration"
import RegisterChild from "./components/common/form/RegisterChild"
import ErrorPage from "./pages/ErrorPage"


function App() {
  const [watchingPage, setWatchingPage] = useState('')
  const handleWatchingPage = (menu)=>{
    setWatchingPage(menu)
  }

  return (  
    <>
      <Routes>
        {/* 헤더+탑바+프로필 있음 */}
        <Route element={<HBLayout watchingPage={watchingPage}/>}>
          <Route path={"/play"} element={<PlayPage handleWatchingPage={handleWatchingPage}/>} />
          <Route path={"/status"} element={<StatusPage handleWatchingPage={handleWatchingPage}/>} />
        </Route>
        {/* 헤더+탑바 있음 */}
        <Route element={<PHBLayout watchingPage={watchingPage}/>}>
          <Route path={"/photos"} element={<PhotosPage handleWatchingPage={handleWatchingPage}/>} />
        </Route>

        {/* 맨 윗줄 헤더만 있음 */}
        <Route element={<NHBLayout />}>
          <Route path={"/users"} element={<UserPage />} />
          <Route path={"/signup"} element={<RegisterChild />} />
          <Route path={"/users/join"} element={<Registration />}/>
          <Route path={"/users/oauth2-kakao"} element={<OauthKakao />}/>
          <Route path={"/users/oauth2-naver"} element={<OauthNaver />}/>
          <Route path={"/error"} element={<ErrorPage/>} />
        </Route>
        {/* 헤더 없음 */}
        <Route path={"/"} element={<InitPage/>}/>
        <Route path={"/play/:modeId/:playId"} element={<StagePage />} />
      </Routes>
    </>
  )
}

export default App
