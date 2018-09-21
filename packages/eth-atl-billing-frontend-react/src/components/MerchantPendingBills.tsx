import * as React from 'react';

  export class MerchantFutureBills extends React.Component {
  
    public constructor(props: any){
      super(props);
    }
    public render(){
      return (
          <div>
              <h1>Pending Bills</h1>
              <h3>Table of pending bills</h3>
          </div>
      );
    }
  }