import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  isLoggedIn: false,
  accessToken: null,
  familyname:null,
  level:1,
  exp:0,
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
      const payload = action.payload;
      console.log(payload)
      const selectedChild = state.children.find(child => child.selected);
      console.log('전 : ', selectedChild)
      if (selectedChild) {
        selectedChild.nickname = payload.nickname;
        selectedChild.profileImageUrl = payload.profileImageUrl;
        selectedChild.gender = payload.gender;
        selectedChild.birthDate = payload.birthDate;
        selectedChild.weight = payload.weight;
        selectedChild.height = payload.height;
      }
      if (payload.familyname) state.familyname = payload.familyname

      console.log('후 : ', selectedChild)
    }
  },
})

export const {login, logout, updateChildState} = userSlice.actions
export default userSlice.reducer
