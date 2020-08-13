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

const mapStateToProps = state =>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

class Main extends Component {

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId,
    })
  }

  render() {
    const Homepage = () => <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
      leader={this.props.leaders.filter((lead) => lead.featured)[0]} />

    // both work similarly 
    const DishWithID = ({ match }) => {
      return (<DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />)
    }
    

    
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithID} />
          <Route exact path='/contactus' component={Contact} />
          <Route path='/aboutus' component={()=> <About leaders={this.props.leaders}/>} />
          <Redirect to="/home" />
        </Switch>
        {/*
            <Menu  dishes={this.state.dishes} onClick={(dishId)=> this.onDishSelect(dishId)}/>
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
          */}
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(Main));
