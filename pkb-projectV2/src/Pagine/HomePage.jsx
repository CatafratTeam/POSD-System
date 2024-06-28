import React from 'react';
import AppBar from "../Components/NavBar";
import MainContainer from '../Components/MainContainerHomePage';

export default function HomePage() {
  return (
    <div className="homePage">
      <AppBar />
      <MainContainer />
    </div>
  );
}
