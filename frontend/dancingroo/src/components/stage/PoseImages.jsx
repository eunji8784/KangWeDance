import styled from "styled-components"
import 손벽치기1 from "../../assets/images/motions/손벽치기1.png"
import 발차기1 from "../../assets/images/motions/발차기1.png"
import 발차기2 from "../../assets/images/motions/발차기2.png"
import 시계추자세1 from "../../assets/images/motions/시계추자세1.png"
import 시계추자세2 from "../../assets/images/motions/시계추자세2.png"
import 악어자세1 from "../../assets/images/motions/악어자세1.png"
import 악어자세2 from "../../assets/images/motions/악어자세2.png"

// const Stars = () => {
//   return (
//     <div className="stars">
//       {Array(item.difficulty).fill(null).map((_, idx) =>     <StarWrapper><Star key={idx} /></StarWrapper>)}
//     </div>
//   )
// }

const Div = styled.div`
  /* background-color:green; */
  width:6rem !important;
  margin-left:-1rem;
  margin-top:-2rem;
  img{
    width:4rem !important;
    height:5rem;
    /* border:1px solid blue; */
  }
  span{
    margin-top:-0.8rem;
    margin-left:-1.5rem;
    font-size:1.3rem !important;
  }
`

export const PoseImages = (posename)=>{
  switch (posename) {
    case "악어자세":
      return(
        <Div>
          <img src={악어자세1} alt="" />
          <img src={악어자세2} alt="" />
        </Div>
      ) 
    case "뒤돌아손뼉치기":
      return(
        <Div>
          <img src={손벽치기1} alt="" />
        </Div>
      )
    case "발차기자세":
      return(
        <Div>
          <img src={발차기1} alt="" />
          <img src={발차기2} alt="" />
        </Div>
      )
    case "시계추자세":
      return(
        <Div>
          <img src={시계추자세1} alt="" />
          <img src={시계추자세2} alt="" />
        </Div>
      )
    default:
      return (
        <Div>
          <span>
          따라춰요!
          </span>
        </Div>
      )
  }
}


