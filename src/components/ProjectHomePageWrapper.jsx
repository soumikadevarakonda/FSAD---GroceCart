// ProjectHomePageWrapper.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHomePage from './ProjectHomePage';

const ProjectHomePageWrapper = () => {
  const navigate = useNavigate();
  return <ProjectHomePage navigate={navigate} />;
};

export default ProjectHomePageWrapper;
