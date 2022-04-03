import React, { useState, useEffect, } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggables, setDraggables] = useState([
    { pos: { x: 0, y: 0 }, name: 'Element 0' },
    { pos: { x: 0, y: 0 }, name: 'Element 1' },
  ]);

  useEffect(() => {
    console.log(draggables);
  }, [draggables]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#282c34",
        color: 'white',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <Grid container>
        <Grid
          item
          xs={2}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: '#ffffff',
                height: '50vh',
                border: '1px solid',
                color: '#000000'
              }}
            >
              <Typography
                variant="title"
              >
                Content
              </Typography>
              <List dense>
                {draggables.map((draggable, index) => (
                  <ListItem
                    selected={index === selectedIndex}
                    onClick={()=> { setSelectedIndex(index) }}
                  >
                    {draggable.name}
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: '#ffffff',
                height: '50vh',
                border: '1px solid',
                color: '#000000'
              }}
            >
              <Typography
                variant="title"
              >
                Properties
              </Typography>
              <List dense>
                {Object.keys(draggables[selectedIndex]).map((attrib) => {
                  if (typeof draggables[selectedIndex][attrib] === 'object')
                    return(
                      <>
                        <ListItem>
                          {attrib}
                        </ListItem>
                        <List dense>
                          {Object.keys(draggables[selectedIndex][attrib]).map((secondary) => (
                            <ListItem>
                              {secondary}: {draggables[selectedIndex][attrib][secondary]}
                            </ListItem>
                          ))}
                        </List>
                      </>
                    );
                  return(
                    <ListItem>
                      {attrib}: {draggables[selectedIndex][attrib]}
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <div style={{backgroundColor: '#ff00ff'}}>
            <button
              onClick={() => {
                setDraggables([
                  ...draggables,
                  {
                    pos: { x: 0, y: 0 },
                    name: `Element ${draggables.length}`
                  }]);
              }}
            >
              Add draggable
            </button>
          </div>
          <div style={{position: 'relative'}}>
            {draggables.map((draggableComponent, index) => (
              <Draggable
                handle=".handle"
                positionOffset={{ x: 'left', y: 'top' }}
                position={draggableComponent.pos}
                grid={[25, 25]}
                scale={1}
                onDrag={(e, data) => {
                  const updDraggable = { ...draggableComponent };
                  const { x, y } = draggableComponent.pos;
                  const { deltaX, deltaY } = data;

                  updDraggable.pos.x = x + deltaX;
                  updDraggable.pos.y = y + deltaY;

                  const updDraggables = [...draggables];
                  updDraggables[index] = updDraggable;

                  setDraggables(updDraggables);
                }}
              >
                <div
                  className="handle"
                  style={{
                    border: '1px solid',
                    backgroundColor: '#282c34',
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    top: draggableComponent.pos.y,
                    left: draggableComponent.pos.x
                  }}
                >
                  <div>{draggableComponent.name}</div>
                  <div>X: {draggableComponent.pos.x}</div>
                  <div>Y: {draggableComponent.pos.y}</div>
                </div>
              </Draggable>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
