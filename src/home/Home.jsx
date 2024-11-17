import * as React from 'react';
import { Box } from '@material-ui/core';
import Navbar from '../navbar/components/Navbar';

function Home(){
  return<Box sx={{  }}>
          <Navbar/>
      <p>Welcome to my Page</p>
        </Box>;
}

export default Home;