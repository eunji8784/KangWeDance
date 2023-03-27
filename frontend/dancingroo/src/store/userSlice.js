import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: null,
  isLoggedIn: false,
  accessToken: null,
  familyname:null,
  level:1,
  exp:0,
  select:0,  // 아이프로필 몇번째 선택상태인지.
  addChild:false,
  children:[
    { 
      childIdx:null,
      nickname:null,
      profileImageUrl:"https://kangwedance.s3.ap-northeast-2.amazonaws.com/기본+프로필+이미지.png",
      gender:false,
      birthDate:null,
      weight:null,
      height:null,
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
    getChildState(state, action) {
      const childData = action.payload
      const {familyname} = action.payload[0]
      state.familyname = familyname
      const defaultChild = {
        childIdx: null,
        nickname: null,
        profileImageUrl:null,
        gender: false,
        birthDate: null,
        weight: null,
        height: null,
      }
      if (childData.length < 3) {
        const addDefault = new Array(3 - childData.length).fill(defaultChild)
        state.children = [...childData, ...addDefault]
      } else {
        state.children = [...childData.slice(0, 3)]
      }
      console.log('아이 정보 불러오기완료!')
    },
    patchChildState(state, action) {
      const {selectedIdx,name,value} = action.payload 
      state.children[selectedIdx][name] = value
      console.log('아이 정보 수정완료!')
    },
    childSelect(state, action){
      const selectedIdx = action.payload
      state.select = selectedIdx
      if (state.children[selectedIdx].childIdx===null) state.addChild = true
      else state.addChild = false
      console.log(state.select,'번째 아이 플레이 중!', '아이등록중?', state.addChild)
    },
    editFamilyname(state, action){
      state.familyname = action.payload
    },
    intoJoinPage(state, action){
      state.addChild = !state.addChild
      console.log('아이등록중?', state.addChild)
    },
  },
})

export const {login, logout, getChildState, patchChildState, childSelect, editFamilyname, intoJoinPage} = userSlice.actions
export default userSlice.reducer
