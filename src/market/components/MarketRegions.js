import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function MarketRegions(props) {
    const { regions, selectedRegion } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Update loading state when regions change
    useEffect(() => {
        setLoading(!regions); // If regions is null or undefined, set loading to true
    }, [regions]);

    // Filter regions based on search query
    const filteredRegions = regions ?
        regions.filter(region =>
            region.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) : [];

    return (
        <div>
            {/* Search bar with autocomplete dropdown */}
            <Autocomplete
                options={filteredRegions}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                    if (value) selectedRegion(value.id);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Regions"
                        variant="outlined"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                )}
            />
            {/* List of filtered regions (hidden) */}
            <List style={{ display: 'none' }}>
                {filteredRegions.map(({ id, name }) => (
                    <ListItem button key={id} onClick={() => selectedRegion(id)}>
                        <ListItemText>
                            <Typography>{name}</Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default MarketRegions;