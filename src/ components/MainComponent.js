import React, { Component } from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderCompoment'
import Contact from './ContactComponent'
import Footer from './FooterComponent'
import About from './AboutComponent'
import { DISHES } from '../shared/dishes'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'
import { COMMENTS } from '../shared/comments'

import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './HomeComponent'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      comments: COMMENTS,
      // for the dish component 
      /*selectedDish:null,*/
    }
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId,
    })
  }

  render() {
    const Homepage = () => <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
      promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
      leader={this.state.leaders.filter((lead) => lead.featured)[0]} />

    // both work similarly 
    const DishWithID = ({ match }) => {
      return (<DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />)
    }
    

    
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithID} />
          <Route exact path='/contactus' component={Contact} />
          <Route path='/aboutus' component={()=> <About leaders={this.state.leaders}/>} />
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
export default Main;
