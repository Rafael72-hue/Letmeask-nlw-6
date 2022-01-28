import { useHistory, useParams } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import check from '../assets/images/check.svg';
import answer from '../assets/images/answer.svg';
import '../styles/room.scss'
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}


export function AdminRoom () {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const { title, questions } = useRoom(params.id);

    async function handleDeleteRoom() {
        database.ref(`rooms/${params.id}`).update({
            endedAt: new Date()
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Tem certeza que você deseja excluir esta pergunta')){
            await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestion(questionId: string) {
        await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHihlightQuestion(questionId: string) {
        await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="Letmeask" />
                    <div>
                        <RoomCode code={params.id}/>
                        <Button isOutlined onClick={handleDeleteRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span> 
                    )}
                </div>    
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={() => handleCheckQuestion(question.id)}
                                        >
                                            <img src={check} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleHihlightQuestion(question.id)}
                                        >
                                            <img src={answer} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}
                                
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                            )
                        })}
                </div>
            </main>    
        </div>
    )
}