import * as React from "react";
import { Link } from "react-router-dom";

export class MenuBar extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <ul>
        <li>
          <Link to="/merchant">Overview</Link>
        </li>
        <li>
          <Link to="/merchant/pending">Pending Bills</Link>
        </li>
        <li>
          <Link to="/merchant/past">Past Bills</Link>
        </li>
        <li>
          <Link to="/merchant/reedemToken">Redeem Bill Token</Link>
        </li>
      </ul>
    );
  }
}
