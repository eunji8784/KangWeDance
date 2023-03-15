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
                width:100%;
                background-color:red;
            }
        }

    }
`;

const Table = styled.table`
    flex-direction:column;
    text-align:center;
    border-collapse: collapse;
    width: 100%;
    th, td {
        padding: 0.5rem;
    }
    thead{
        border-bottom:3px solid black;
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
                        <Table className="diet-table">
                            <thead>
                                <tr>
                                    <th>아침</th>
                                    <th>점심</th>
                                    <th>저녁</th>
                                </tr>
                            </thead>
                            <tbody>
                        {/* 여기서 tr을 map돌리면 될듯 */}
                                <tr>
                                    <td>17:5</td>
                                    <td>상어송</td>
                                    <td>90</td>
                                    <td>1030kcal</td>
                                </tr>
                                <tr>
                                    <td>17:25</td>
                                    <td>균형잡기</td>
                                    <td>98</td>
                                    <td>800kcal</td>
                                </tr>
                            </tbody>
                        </Table>
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
