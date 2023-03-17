import React, { useState } from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"

import HBLayout from "./layout/HBLayout"
import NHBLayout from "./layout/NHBLayout"
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

function App() {
  // const [watchingPage, setWatchingPage] = useState('play')
  let watchingPage = ''
  const handleWatchingPage = (menu)=>{
    watchingPage = menu
  }

  return (
    <>
      <Routes>
        {/* 헤더 있음 */}
        <Route element={<HBLayout watchingPage={watchingPage}/>}>
          <Route path={"/play"} element={<PlayPage handleWatchingPage={handleWatchingPage}/>} />
          <Route path={"/status"} element={<StatusPage handleWatchingPage={handleWatchingPage}/>} />
          <Route path={"/photos"} element={<PhotosPage handleWatchingPage={handleWatchingPage}/>} />
          <Route path={"/users"} element={<UserPage />} />
        </Route>
        {/* 맨 윗줄 헤더만 있음 */}
        <Route element={<NHBLayout />}>
          <Route path={"/users/join"} element={<Registration />}/>
          <Route path={"/users/oauth2-kakao"} element={<OauthKakao />}/>
          <Route path={"/users/oauth2-naver"} element={<OauthNaver />}/>
        </Route>
        {/* 헤더 없음 */}
        <Route path={"/"} element={<InitPage/>}/>
        <Route path={"/play/:modeId/:playId"} element={<StagePage />} />
      </Routes>
    </>
  )
}

export default App
