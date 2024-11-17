import * as React from 'react';
import { Box } from '@material-ui/core';
import Navbar from '../navbar/components/Navbar';

function Home() {
    return (
        <Box sx={{}}>
            <Navbar />
            <h2>Tab functionalities</h2>
            <ul>
                <li>
                    <strong>Market Tab:</strong> Displays real-time buy and sell orders in Eve Online, categorized by region.
                </li>
                <li>
                    <strong>Graph Tab:</strong> Allows users to analyze price trends of multiple items or regions over custom time periods, providing insights into market changes.
                </li>
            </ul>
        </Box>
    );
}

export default Home;