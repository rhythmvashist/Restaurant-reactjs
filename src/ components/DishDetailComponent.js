import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem,Button,Modal, ModalHeader,ModalBody,Label,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm,Errors} from 'react-redux-form'
import {Loading} from './LoadingComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => !(val) || (val.length>=len);

class CommentForm extends Component{
  constructor(props){
    super (props);
    this.state = {
      isModalOpen:false
    }
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values){
    this.toggleModal();
    this.props.addComment(this.props.dishId,values.rating,values.name,values.comment);
  }

  render() {
    return (
    <div>
      <Button outline onClick={this.toggleModal} ><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={{ size: 12 }}>
                  <Control.select model=".rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="name" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                  
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows={5}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
            </ModalBody>
            </Modal>
    </div>
    );
  }


}

function RenderDish({ dish }) {
  if (dish !== null) {
    return (
      <div key={dish.id} className='col-12 col-md-5 m-1'>
        <Card >
          <CardImg top width="100%" src={dish.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
  else {
    return (<div></div>)
  }
}

function RenderComments({ comments,dishId,addComment }) {
  if (comments !== null) {
    return (
      <div className='col-12 col-md-5 m-1'>
        <h4>Comments</h4>
        <ul className='list-unstyled'>
          {comments.map(comment =>
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author},
              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(comment.date))}
              </p>
            </li>
          )}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment}/>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

const DishDetail = (props) => {
  if(props.isLoading){
    return (<div className='container'>
      <div className='row'>
        <Loading/>
      </div>
    </div>)
  }

  else if (props.errMsg){
    return (
    <div className='container'>
      <div className='row'>
        <h4>{props.errMsg}</h4>
      </div>

    </div>)
  }

  else if (props.dish != null) {
    return (
      <div className='container'>
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} dishId={props.dish.id} addComment={props.addComment}/>
        </div>
      </div>
    )    
  }
  else {
    return (<div></div>)
  }
}


export default DishDetail;