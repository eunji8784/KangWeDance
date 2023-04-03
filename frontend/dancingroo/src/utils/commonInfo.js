export const levelDesign = {
  1:0,
  2:100,
  3:150,
  4:225,
  5:337,
  6:506,
  7:759,
  8:1138,
  9:1707,
  10:2560
}

export const tagColors = {
  유산소:"#F5EF34",
  유연성:"#49EBBE",
  몸통:"#84eb78",
  균형감각:"#EB896C",
  키성장:"#4989EB",
  팔:"#CE54EB",
  다리:"#EA5A24",
}

// 18.5,23,25,30 저체중 정상 과체중 비만 고도비만
export const bmiCheck = (num)=>{
  let state = '정상'
  if (num < 13.63) state='저체중'
  else if (num < 18.27) state = '정상'
  else if (num < 20.05) state='과체중'
  else state ='비만'
  return state
}