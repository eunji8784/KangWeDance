import React, { useEffect, useState } from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/userSlice";
// Layout
import HBLayout from "./layout/HBLayout"
import PHBLayout from "./layout/PHBLayout"
import NHBLayout from "./layout/NHBLayout";
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
import ErrorPage from "./pages/ErrorPage"


function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state=>state.userState.isLoggedIn)
  const [watchingPage, setWatchingPage] = useState('')
  const [Cookie, , ] = useCookies('accessToken')

  useEffect(()=>{
    const existingToken = Cookie.accessToken;
    if (existingToken) {
      dispatch(login(existingToken));
    } 
  },[dispatch, Cookie.accessToken])


  const handleWatchingPage = (menu)=>{
    setWatchingPage(menu)
  }  
  return (  
    <>
      <Routes>
        {/* 헤더+탑바+프로필 있음 */}
        <Route element={<HBLayout watchingPage={watchingPage} isLoggedIn={isLoggedIn}/>}>
          <Route path={"/play"} element={<PlayPage handleWatchingPage={handleWatchingPage}/>} />
          <Route path={"/status"} element={<StatusPage handleWatchingPage={handleWatchingPage}/>} />
        </Route>
        {/* 헤더+탑바 있음 */}
        <Route element={<PHBLayout watchingPage={watchingPage} isLoggedIn={isLoggedIn}/>}>
          <Route path={"/photos"} element={<PhotosPage handleWatchingPage={handleWatchingPage}/>} />
        </Route>
        {/* 맨 윗줄 헤더만 있음 */}
        <Route element={<NHBLayout isLoggedIn={isLoggedIn}/>}>
          <Route path={"/users"} element={<UserPage />} />
          <Route path={"/users/join"} element={<Registration />}/>
          <Route path={"/users/oauth2-kakao"} element={<OauthKakao />}/>
          <Route path={"/users/oauth2-naver"} element={<OauthNaver />}/>
          <Route path={"/*"} element={<ErrorPage/>} />
        </Route>
        {/* 헤더 없음 */}
        <Route path={"/"} element={<InitPage/>}/>
        <Route path={"/play/:modeId/:playId"} element={<StagePage />} />
      </Routes>
    </>
  )
}

export default App
