import * as React from 'react';
import { Link } from 'react-router-dom';


export class MainPage extends React.Component {
  
  public constructor(props: any){
      super(props);
    }

  public render() {
    return (
      <div>
        <Link to='/consumer/create'>I want a billable wallet</Link>
        <br/>
        <Link to='/merchant/create'>I want to accept recurring payments in ethereum</Link>
      </div>
    );
  }
}
