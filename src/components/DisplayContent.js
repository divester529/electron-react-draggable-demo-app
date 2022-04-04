import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography } from '@mui/material';

function DisplayContent(props) {
    const { components, selectedIndex, setSelectedIndex } = props;

    return (
        <>
            <Typography
                variant="title"
              >
                Content
              </Typography>
              <hr/>
              <List dense>
                {components.map((component, index) => (
                  <ListItem
                    selected={index === selectedIndex}
                    onClick={()=> { setSelectedIndex(index) }}
                  >
                    {component.Name}
                  </ListItem>
                ))}
              </List>
        </>
    )
}

export default DisplayContent;