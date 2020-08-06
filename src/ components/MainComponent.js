import React ,{Component} from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderCompoment'
import Footer from  './FooterComponent'
import {DISHES} from '../shared/dishes'
import {Route,Redirect, Switch} from 'react-router-dom';
import Home from './HomeComponent'

class Main extends Component {
  constructor(props) {
    super (props);
    this.state = { 
      dishes: DISHES,
      selectedDish:null,
     }
    }

    onDishSelect(dishId){
        this.setState({
            selectedDish:dishId,
        })
    }


    render() {
        const Homepage = () =>  <Home />
            


      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={Homepage} />
            <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>} />
            <Redirect to="/home"/>
          </Switch>
          <Menu  dishes={this.state.dishes} onClick={(dishId)=> this.onDishSelect(dishId)}/>
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
          <Footer />
        </div>
      );
  }
}
export default Main;
