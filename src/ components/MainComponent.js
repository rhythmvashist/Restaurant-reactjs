import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderCompoment'
import Contact from './ContactComponent'
import Footer from './FooterComponent'
import About from './AboutComponent'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './HomeComponent'
import {addComment, fetchDishes, fetchComments,fetchPromos} from '../redux/ActionCreators'
import {actions} from 'react-redux-form'


const mapStateToProps = state =>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment:(dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes:() => dispatch(fetchDishes()),
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
  fetchComments:() => dispatch(fetchComments()),
  fetchPromos:() => dispatch(fetchPromos()),
});

componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
}


class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId,
    })
  }

  render() {
    const Homepage = () => {
    return(
    <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
      leader={this.props.leaders.filter((lead) => lead.featured)[0]}
      dishesLoading={this.props.dishes.isLoading} 
      dishesErrMsg={this.props.dishes.errMsg} 
      promosLoading={this.props.promotions.isLoading} 
      promosErrMsg={this.props.promotions.errMsg}
      />)}

    // both work similarly 
    const DishWithID = ({ match }) => {
      return (<DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        errMsg={this.props.dishes.errMsg} 
        isLoading={this.props.dishes.isLoading} 
        addComment={this.props.addComment}/>)
    }
    
  
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithID} />
          <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
          <Route path='/aboutus' component={()=> <About leaders={this.props.leaders}/>} />
          <Redirect to="/home" />
        </Switch>
        {/* <Menu  dishes={this.state.dishes} onClick={(dishId)=> this.onDishSelect(dishId)}/>
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
          */}
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
