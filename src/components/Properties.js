import React, { useEffect, useState } from 'react';
import { List, ListItem, Typography, TextField } from '@mui/material';

function AttributeList(props) {
    const { attributes, selectedIndex, selectedComponent, components, setComponents, parents, style } = props;

    return(
        <List dense style={style}>
            {Object.keys(attributes).map((attrib) => {
                if (typeof attributes[attrib] === 'object') {
                    return(
                        <>
                            <ListItem>
                                {attrib}
                            </ListItem>
                        <AttributeList
                            attributes={attributes[attrib]}
                            selectedIndex={selectedIndex}
                            selectedComponent={selectedComponent}
                            components={components}
                            setComponents={setComponents}
                            style={{marginLeft: '1rem'}}
                            parents={parents ? parents[attrib] : attrib}
                        />
                      </>
                    );
                }

                return(
                <ListItem>
                    <Typography
                        variant="body1"
                        style={{ marginRight: '1rem', }}
                    >
                        {attrib}:
                    </Typography>
                    <TextField
                        variant="outlined"
                        value={attributes[attrib]}
                        size="small"
                        onChange={(event) => {
                            const updComponents = [...components ]; 
                            const updRecord = {...selectedComponent };
                            console.log(parents);
                            attributes[attrib]=event.target.value
                            if(parents)
                                updRecord[parents][attrib] = event.target.value;
                            else 
                                updRecord[attrib] = event.target.value;

                            console.log(updRecord);
                            updComponents[selectedIndex] = updRecord;
                            setComponents(updComponents);
                        }}
                    />
                    </ListItem>
                  );
                })}
        </List>
    )
}

function Properties(props) {
    const { selectedComponent, selectedIndex, components, setComponents } = props;

    return (
        <>
            <Typography
                variant="title"
            >
                Properties
            </Typography>
            <hr/>
            <AttributeList
                attributes={selectedComponent}
                selectedIndex={selectedIndex}
                selectedComponent={selectedComponent}
                components={components}
                setComponents={setComponents}
            />
        </>
    )
}

export default Properties;