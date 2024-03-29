import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: '#f0f0f0', // Example background color
    borderRadius: '4px', // Example border radius
    marginBottom: theme.spacing(1), // Example margin bottom
  },
  nestedListItem: {
    backgroundColor: '#e0e0e0', // Example background color for nested items
    paddingLeft: theme.spacing(2), // Example left padding for nested items
  },
}));


function ItemGroups({ groups, selectedMarketItem, level = 0 }) {
  const [openGroups, setOpenGroups] = useState([]);
  const classes = useStyles();

  const handleMarketGroupsToggle = (id) => {
    if (openGroups.includes(id)) {
      setOpenGroups(openGroups.filter((i) => i !== id));
    } else {
      setOpenGroups([...openGroups, id]);
    }
  };

  const handleMarketItemUpdate = (id) => {
    selectedMarketItem(id);
  }

  return (
    <List>
      {groups &&
        groups.map(({ name, marketGroupId, childGroups, marketItems }) => (
          <div key={marketGroupId} style={{ marginLeft: `${level * 2}px` }}>
            <ListItem button onClick={() => handleMarketGroupsToggle(marketGroupId)} className={classes.listItem}>
              <ListItemText>
                <Typography style={{ fontSize: '8px' }}>{name}</Typography>
              </ListItemText>
            </ListItem>
            {(
              childGroups &&
              childGroups.length > 0 && openGroups.includes(marketGroupId) && (
                <ItemGroups groups={childGroups} selectedMarketItem={selectedMarketItem} level={level + 2} />
              )) ||
              ( openGroups.includes(marketGroupId) &&
                marketItems &&
                marketItems.length > 0 && (
                  <List style={{ marginLeft: '16px' }}>
                    {marketItems.map((item) => (
                      <ListItem key={item.typeId} className={classes.nestedListItem} onClick={() => handleMarketItemUpdate(item.typeId)}>
                        <ListItemText>
                          <Typography style={{ fontSize: '8px' }}>
                            {item.name}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                ))}
          </div>
        ))}
    </List>
  );
}

function MarketBrowse(props) {
  const [marketList, setMarketList] = useState(props.marketGroups);
  useEffect(() => {
  }, []);

  return (
    <div>
      <ItemGroups groups={props.marketGroups} selectedMarketItem={props.handleMarketItemUpdate} />
    </div>
  );
}

export default MarketBrowse;