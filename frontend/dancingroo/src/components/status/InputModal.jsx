import React,{useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchChildState } from "../../store/userSlice";
import styled from "styled-components";
import {Wrapper, Footer} from "../common/ui/Semantics";
import useApi from "../../hooks/auth/useApi";
import Swal from "sweetalert2";

const ModWrapper = styled(Wrapper)`
    width: 20%;
    height: 40%;
    min-width: 20rem;
    min-height: 22rem;
    border: solid 0.15rem #F05475;
    display:${({isModalOpen})=>isModalOpen? "flex":"none"};
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0; z-index: 2;
    margin:auto;
    background-color: white;
    letter-spacing:0.1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.5);
    color: #323232;
    &>h1{
        margin: 0;
    }
`;

const InputMod = styled.input`
    outline:none;
    border: 0.15rem solid  rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    width: 6rem;
    margin-right:0.5rem;
    height: 1.6rem;
    cursor: pointer;
`

const ModFooter = styled(Footer)`
    margin-top:1rem;
    width:13rem;
    justify-content:space-between;
    &>button{
        background-color:#F05475;
        outline:none;
        border:none;
        border-radius:10px;
        min-width:5.5rem;
        min-height:2rem;
        color:white;
        letter-spacing:0.1rem;
        font-weight:500;
        font-size:1.2rem;
        margin-top: 0.5rem;
        cursor: pointer;
        transition: box-shadow 0.3s ease-in-out;
        &:hover{
            box-shadow: 0px 3px 15px rgba(240, 84, 117, 0.6);
        }
        &:last-child{
            background-color:grey;
        }
    }   
`

const Line = styled.div`
    width: 100%;
    border-bottom: solid 0.15rem #F05475;
`

const LabelText  = styled.label`
    width: 6rem;
    height: 1.6rem;
    display: flex;
    justify-content: start;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1.2rem;
`

function InputModal({handleIsModalOpen, isOpen}) {
    const dispatch = useDispatch()
    const selectedIdx = useSelector(state=>state.userState.select)
    const {nickname, height, weight, childIdx} = useSelector(state=>state.userState.children[selectedIdx||0])
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    const bodyStateUpdate = useApi()
    const weightRef = useRef(); 
    const heightRef = useRef(); 
    const [w, setW] = useState(weight)
    const [h, setH] = useState(height)

    useEffect(()=>{
        setW(weight)
        setH(height)
    }, [height, weight])

    const submitBodyUpdate = ()=>{
        Swal.fire({
            text: "등록하시겠습니까?",
            width: 300,
            showCancelButton: true,
            iconColor: '#F05475 ',
            confirmButtonColor: '#F05475 ',
            confirmButtonText: "등록",
            cancelButtonText: "취소"
        }).then(function(e){
            if(e.isConfirmed === true) {
                
                const onSuccess = ()=>{
                    Swal.fire({
                        text:'등록되었습니다!',
                        width: 300,
                        confirmButtonColor: '#F05475'
                    })
                    dispatch(patchChildState({selectedIdx, name:"height", value:h}))
                    dispatch(patchChildState({selectedIdx, name:"weight", value:w}))
                }
                
                const body = {
                    weight:w, height:h, today_calrories:0, childIdx
                }

                bodyStateUpdate.fetchApi('POST', `/children/body-update`, body, onSuccess)
                weightRef.current.value=''
                heightRef.current.value=''
                handleIsModalOpen()
            }
        })

    }

    const onChangeHeight= (e)=>{
        setH(e.target.value)
    }

    const onChangeWeight = (e)=>{
        setW(e.target.value)
    }

    return (
        <ModWrapper isModalOpen={isOpen}>
            <h1>{formattedDate}</h1>
            <h3>{nickname}(이) 기록하기</h3>
            <Line/>
            <div>
                <LabelText htmlFor="height" >키</LabelText>
                <InputMod  id="height" type="text" placeholder={height} name={"height"}  ref={heightRef} onChange={onChangeHeight}/>
                <h4>cm</h4>
            </div>
            <Line/>
            <div>
                <LabelText htmlFor="weight" >몸무게</LabelText>
                <InputMod id="weight" type="text" placeholder={weight} name={"weight"}  ref={weightRef} onChange={onChangeWeight}/>
                <h4>kg</h4>
            </div>
            <Line/>
            <ModFooter>
                <button onClick={()=>{
                    submitBodyUpdate()
                }}>완  료</button>
                <button onClick={()=>{
                    handleIsModalOpen()
                    weightRef.current.value=''
                    heightRef.current.value=''
                }}>닫 기</button>
            </ModFooter>
        </ModWrapper>
    );
}

export default InputModal;
