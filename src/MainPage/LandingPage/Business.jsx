import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./css/style.css";
import Expenses from "./Expenses";
import Invoicing from "./Invoicing";
import Reports from "./Reports";

const Business = () => {
  const languageName = localStorage.getItem("languageName");

  return (
    <Router>
      <section className='business'>
        {languageName === "BD" ? (
          <h2 className='title'>
            আপনার নিজের শর্তে আপনার ব্যবসা পরিচালনা করুন{" "}
          </h2>
        ) : (
          <h2 className='title'>Run your business on your terms</h2>
        )}

        <div className='options'>
          {/* <Link className="link-iteam" to="/invoicing">
            Invoicing
          </Link> */}
          <Link to='/' className='second-option link-iteam'>
            {languageName === "BD" ? "আয় এবং ব্যয়" : "Income and Expenses"}{" "}
          </Link>
          {/* <Link to="/reports" className="link-iteam">
            Reports{" "}
          </Link> */}
        </div>
        <Switch>
          <Route exact path='/'>
            <Expenses />
          </Route>
          {/* <Route path='/invoicing'>
            <Invoicing />
          </Route>
          <Route path='/reports'>
            <Reports />
          </Route> */}
        </Switch>
      </section>
    </Router>
  );
};

export default Business;
