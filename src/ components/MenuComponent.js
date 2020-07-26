import React, { Component } from 'react';
import {Card, CardBody,CardTitle, CardImgOverlay, CardText, CardImg } from 'reactstrap'


class Menu extends Component {
  // here in the constructor we are only using props so no need for a physical constructor 
    render() {
        const menu=this.props.dishes.map(i => {
            return <div key={i.id} className='col-12 col-md-5 mt-5'>
                <Card>
                    <CardImg width="100%" src={i.image} alt={i.name}></CardImg>
                    <CardImgOverlay>
                        <CardTitle>{i.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        });
        return(
            <div className='container'>
                <div className='row'>
                    {menu}
                </div>
            </div>
        )   
    }
}

export default Menu;