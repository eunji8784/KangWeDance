import React from "react"
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

function App() {
  return (
    <>
      <Routes>
        {/* 헤더 있음 */}
        <Route element={<HBLayout />}>
          <Route path={"/play"} element={<PlayPage />} />
          <Route path={"/status"} element={<StatusPage />} />
          <Route path={"/photos"} element={<PhotosPage />} />
          <Route path={"/users"} element={<UserPage />} />
        </Route>
        {/* 맨 윗줄 헤더만 있음 */}
        <Route element={<NHBLayout />}>
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
