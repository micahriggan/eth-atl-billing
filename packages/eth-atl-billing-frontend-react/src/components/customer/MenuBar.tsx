import * as React from 'react';
import { Link } from 'react-router-dom';

  export class MenuBar extends React.Component {
  
    public constructor(props: any){
      super(props);
    }
    public render(){
      return (
          <ul>
              <li>
                  <Link to="/customer">Overview</Link>
              </li>
              <li>
                  <Link to="/customer/deposit">Deposit</Link>
              </li>
              <li>
                  <Link to="/customer/withdraw">Withdraw</Link>
              </li>
              <li>
                  <Link to="/customer/generateToken">Generate Token</Link>
              </li>
          </ul>
      );
    }
  }