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
  유산소:"#FBCA3C",
  유연성:"#49EBBE",
  몸통:"#84eb78",
  균형감각:"#EB896C",
  키성장:"#4989EB",
  팔:"#CE54EB",
  다리:"#EA5A24",
}

export const bmiCheck = (num)=>{
  let state = '정상'
  if (num < 13.63) state='저체중'
  else if (num < 18.27) state = '정상'
  else if (num < 20.05) state='과체중'
  else state ='비만'
  return state
}

export const poseTable = {
  1: '뒤돌아손뼉치기',
  2: '발차기자세',
  3: '악어자세',
  4: '시계추자세',
  5: '나무자세',
  6:'스케이트자세',
  7: '기대서팔굽혀펴기',
  8: '기지개자세',
  9: '날개자세',
  10: '기본자세'
}