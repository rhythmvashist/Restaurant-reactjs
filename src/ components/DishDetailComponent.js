import React from 'react'
import {Card, CardBody,CardTitle, CardText, CardImg } from 'reactstrap'


  function RenderDish({dish}){
    if(dish!==null){
      return(
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

  function RenderComments({comments}){
    if(comments !==null){
      const commentsMapped = comments.map(comment =>
         <li>
           <p>{comment.comment}</p>
           <p>-- {comment.author}, 
           {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(comment.date))}
           </p>
         </li>
      )

      return(
        <div className='col-12 col-md-5 m-1'>
          <h4>Comments</h4>
            <ul className='list-unstyled'>
              {commentsMapped}
            </ul>
        </div>
      )
    }
    else{
      return (
        <div></div>
      )
    }
}

const DishDetail = (props)=>{

    if (props.dish !=null){
      return(
          <div className='container'>
            <div className='row'>
              <RenderDish dish ={props.dish}/>
              <RenderComments comments={props.dish.comments}/>
            </div>
          </div>
      )
    }
    else{
      return (
      <div>
      </div>)
    }
    
  }

export default DishDetail;