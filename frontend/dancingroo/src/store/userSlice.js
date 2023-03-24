import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  isLoggedIn: false,
  accessToken: null,
  familyname:null,
  level:1,
  exp:0,
  select:0,  // 아이프로필 몇번째 선택상태인지.
  children:[
    { 
      index:0,
      childIdx:null,
      nickname:null,
      profileImageUrl:"https://kangwedance.s3.ap-northeast-2.amazonaws.com/기본+프로필+이미지.png",
      gender:false,
      birthDate:null,
      weight:null,
      height:null,
      selected:true,
    },
    { 
      index:1,
      childIdx:null,
      nickname:null,
      profileImageUrl:"https://kangwedance.s3.ap-northeast-2.amazonaws.com/기본+프로필+이미지.png",
      gender:false,
      birthDate:null,
      weight:null,
      height:null,
      selected:false,
    },
    {
      index:2,
      childIdx:null,
      nickname:null,
      profileImageUrl:"https://kangwedance.s3.ap-northeast-2.amazonaws.com/기본+프로필+이미지.png",
      gender:false,
      birthDate:null,
      weight:null,
      height:null,
      selected:false,
    },
  ]
}

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true
      state.accessToken = action.payload
      console.log(`store에 토큰 저장 성공!`)
    },
    logout(state, action) {
      state.isLoggedIn = false
      state.accessToken = null
      console.log(`로그아웃 성공`)
    },
    updateChildState(state, action) {
      const childData = action.payload
      state.children = [...childData.splice(0,3)]
      console.log('아이 정보 저장완료!')
    },
    childSelect(state, action){
      state.select = action.payload
      console.log(state.select,'번째 아이 플레이 중!')
    }
  },
})

export const {login, logout, updateChildState, childSelect} = userSlice.actions
export default userSlice.reducer
