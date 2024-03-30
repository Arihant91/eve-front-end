import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function MarketRegions(props) {
    const { regions, selectedRegion } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(!regions);
    }, [regions]);

    const filteredRegions = regions ?
        regions.filter(region =>
            region.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) : [];

    return (
        <div>
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