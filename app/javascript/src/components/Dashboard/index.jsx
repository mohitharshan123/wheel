import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Navbar from "components/Common/Navbar";

import PasswordEdit from "./Account/Passwords/Edit";
import Profile from "./Account/Profile";
import Notes from "./Notes";
import { NotesProvider } from "contexts/notes";

const Home = () => {
  return (
    <>
      <NotesProvider>
        <div className="flex h-screen">
          <Navbar />
          <div className="flex flex-col items-start justify-start flex-grow h-screen overflow-y-auto">
            <Switch>
              <Route exact path="/notes" component={Notes} />
              <Route exact path="/my/password/edit" component={PasswordEdit} />
              <Route exact path="/my/profile" component={Profile} />
              <Redirect from="/" to="/notes" />
            </Switch>
          </div>
        </div>
      </NotesProvider>
    </>
  );
};

export default Home;
