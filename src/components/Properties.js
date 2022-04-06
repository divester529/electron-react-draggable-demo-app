import React from 'react';
import { List, ListItem, Typography, TextField, Select, MenuItem } from '@mui/material';

const TYPES = [
    { value: 'div', label: 'Rect' },
    { value: 'button', label: 'Button' },
    { value: 'select', label: 'Select' },
];

const ATTRIBUTES = {
    Name: { render: (props) => <TextField {...props} /> },
    Label: { render: (props) => <TextField {...props} /> },
    Type: { render: (props) => <Select {...props} > 
        {TYPES.map((type) => <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>)}
        </Select> },
    x: { render: (props) => <TextField {...props} /> },
    y: { render: (props) => <TextField {...props} /> },
};

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
                        {ATTRIBUTES[attrib].render({
                            variant: 'outlined',
                            value: attributes[attrib],
                            size: "small",
                            fullWidth: true,
                            onChange: (event) => {
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
                            }
                        })}
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