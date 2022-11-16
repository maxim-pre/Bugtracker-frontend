import React, { Component } from "react";
import { useParams } from "react-router-dom";

const Project = () => {
  const { id } = useParams();
  return <h1>project {id}</h1>;
};

export default Project;
