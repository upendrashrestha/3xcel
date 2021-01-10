import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {  Container, Row, Col } from 'react-bootstrap';
import QuestionService from '../../services/questions.service';
import DashboardLayout from '../../shared/DashboardLayout';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';
import Toast from 'react-bootstrap/Toast';
import Grid from '../grids/grid';
import PopUp from '../popup';


const ListQuestion = () => {
  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    await QuestionService.getContent()
      .then((result) => {
        setLoading(false);
      console.log(result.data);
        setQuestion(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [show, setShow] = useState(false);
  
  const [showPopUp, setShowPopUp] = useState(false);
  const [editing, setEditing] = useState(false);
  
  const initialFormState = { _id: null, question: '', answer: '', category:'' }
  const deleteRow = async (e) => {
    if (window.confirm("Are you sure?"))
      deleteQuestion(e);
  }

  const deleteQuestion = async (event) => {
    setMessage(null);
    event.preventDefault();
    await QuestionService.deleteContent(event.target.id)
      .then((result) => {
        let successMsg = { status: "success", mode: "delete", text: "Successfully deleted." };
        setMessage(successMsg);
        getAPI();
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "delete", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
      });
  }

  const addQuestion = async (question) => {
    await QuestionService.addContent(question)
      .then((result) => {
        let successMsg = { status: "success", mode: "added", text: "Successfully added." };
        setMessage(successMsg);
        setShow(true);
        setShowPopUp(false);
        getAPI();
        setCurrentQuestion({ _id: '', question:'', answer:'', category:''});
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "added", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setShow(true);
        console.log(err);
      });
  }


  const updateQuestion = async (question) => {
    console.log("Question", question);
    await QuestionService.editContent(question)
      .then((result) => {
        console.log(result);
        let successMsg = { status: "success", mode: "modified", text: "Successfully edited." };
        setMessage(successMsg);
       setShow(true);
       setShowPopUp(false);
        getAPI();
        setEditing(false);
      })
      .catch((err) => {
        let unsuccessMsg = { status: "failure", mode: "modified", text: "Oops! Something went wrong." };
        setMessage(unsuccessMsg);
        setEditing(false);
       setShow(true);
      });
  }

  const editRow = async(question) => {
    setEditing(true);
    setShowPopUp(true);
    setCurrentQuestion({ _id: question._id, question: question.question, answer: question.answer, category: question.category })
  }

  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [deleting] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(initialFormState)
  
 const gridFields = [
 {title:'Category',name:'category',width:'15'},
 {title:'Question',name:'question', width:'25%'},
 {title:'Answer', name:'answer', width:'40%'}];


const handleClose = () => {
  setShowPopUp(false);
};

const showModal = () => {
  setEditing(false);
  setShowPopUp(true);
};

  return (
    <DashboardLayout title="Questions" header="Questions">
      {message &&
        <Toast
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            backgroundColor: message.status === 'success' && "#5cb85c" || "#ed1922",
            color: "#fff",
            display: "block"
          }}

          onClose={() => setShow(false)} show={show} delay={5000} autohide>
          <Toast.Body> {message.text}
          </Toast.Body>
        </Toast>
      }

      {loading ? (
        <p>Loading...</p>
      ) : (
          <Container>
                  
                  <Button 
        onClick={() => {
          showModal()
        }}
        className="p-1 button muted-button"
      >
        Add New Question
</Button>
             
                <PopUp
                title={editing && "Edit Question" || "Add New Question"}
                description=""
                show={showPopUp}
                hide={handleClose}
                size="lg">
                   {editing ===true  ? 
                  <EditQuestion
                    editing={editing}
                    setEditing={setEditing}
                    currentQuestion={currentQuestion}
                    updateQuestion={updateQuestion}
                  /> :
                  <AddQuestion addQuestion={addQuestion} />
                  }
                  </PopUp>
                
           
            <Row className="pt-4">
            <Col sm={12} md={12} lg={12}>
              <Grid 
              data={question}
              size="sm" 
              striped={true}
              fields={gridFields}
              enableEdit={true}
              editData ={editRow}
              deleteData={deleteRow}
              enableDelete={true}
              enableIndex={true}
              enableSearch={true}/>
               </Col>
            </Row>
          </Container>
        )}
    </DashboardLayout>
  );
};

export default ListQuestion;
