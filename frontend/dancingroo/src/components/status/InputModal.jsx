import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display:${({isModalOpen})=>isModalOpen? "flex":"none"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border:1px solid transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius:10px;
    /* transition: all 0.5s ease-in-out; */
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    margin:auto;
    width: 80%;
    height: 75%;
    background-color: white;
    z-index: 2;
    letter-spacing:0.2rem;
    *{
        display:flex;
        align-items:center;
        &.title{
            color:#F05475;
        }
        input{
            border:2px solid #F05475;
            border-radius:10px;
            outline:none;
            margin-left:0.5rem;
            width:7rem;
            height:1.5rem;
        }
    }
    main{
        width:80%;
        height:70%;
        flex-direction:column;
        border:1px solid black;
    }
    section{
        width:100%;
        .title{
            min-width:15%;
            
        }
        &.body{
            &>article:nth-child(2){
                margin-left: 1rem;
                &>div{
                    margin-left:1.5rem;   
                }
            }
        }
        &.diet{
            flex-direction:column;
            /* border:1px solid black; */
            .title{
                width:100%;
                input{
                    margin-left: 2.5rem;
                    width:25rem;
                }
            }
            &>article:last-child{
            justify-content:space-around;
            width:95%;
            border: 1px solid blue;
            border-radius:6px;
            }
            .diet-table{
                background-color:red;
            }
        }

    }
`;

function InputModal(props) {
    const {handleIsModalOpen, isOpen} = props
    const [recentH, recentKg] = [181,78]
    const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

    return (
        <Wrapper isModalOpen={isOpen}>
            <header>
                <h1>{formattedDate} OO이 기록하기</h1>
            </header>
            <main>
                <section className="body">
                    <article className="title">
                        <h3>신체 정보</h3>
                    </article>
                    <article>
                        <div>
                            <h4>키</h4>
                            <input type="text" placeholder={recentH}/>
                        </div>
                        <div>
                            <h4>몸무게</h4>
                            <input type="text" placeholder={recentKg}/>
                        </div>
                    </article>
                </section>
                <section className="diet">
                    <article className="title">
                        <div>
                            <h3>식단 정보</h3>
                            <input type="text" placeholder="음식을 검색해보세요"/>
                        </div>
                    </article>
                    <article>
                        <div className="diet-table">
                            <div>아침</div>
                            <div>점심</div>
                            <div>저녁</div>
                        </div>
                    </article>
                </section>
            </main>
            <footer>
                <button onClick={()=>handleIsModalOpen()}>닫기</button>
            </footer>
        </Wrapper>
    );
}

export default InputModal;
