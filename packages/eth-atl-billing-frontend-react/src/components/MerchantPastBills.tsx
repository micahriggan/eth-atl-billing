import * as React from 'react';

  export class MerchantPastBills extends React.Component {
  
    public constructor(props: any){
      super(props);
    }
    public render(){
      return (
          <div>
              <h1>Past Bills</h1>
              <h3>Table of past bills</h3>
          </div>
      );
    }
  }