import React, { useState, useEffect, } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import logo from './logo.svg';
import './App.css';

import DisplayContent  from './components/DisplayContent';
import Properties from './components/Properties';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggables, setDraggables] = useState([
    { Name: 'Element 0', Label: 'Element 0', Position: { x: 0, y: 0 } },
    { Name: 'Element 1', Label: 'Element 1', Position: { x: 0, y: 0 } },
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
              <DisplayContent
                components={draggables}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
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
              <Properties
                selectedComponent={draggables[selectedIndex]}
                selectedIndex={selectedIndex}
                components={draggables}
                setComponents={setDraggables}
              />
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
                    Name: `Element ${draggables.length}`,
                    Label: `Element ${draggables.length}`,
                    Position: { x: 0, y: 0 },
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
                position={draggableComponent.Position}
                grid={[25, 25]}
                scale={1}
                onDrag={(e, data) => {
                  const updDraggable = { ...draggableComponent };
                  const { x, y } = draggableComponent.Position;
                  const { deltaX, deltaY } = data;

                  updDraggable.Position.x = x + deltaX;
                  updDraggable.Position.y = y + deltaY;

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
                    top: draggableComponent.Position.y,
                    left: draggableComponent.Position.x
                  }}
                  onClick={() => { setSelectedIndex(index); }}
                >
                  <div>{draggableComponent.Label}</div>
                  <div>X: {draggableComponent.Position.x}</div>
                  <div>Y: {draggableComponent.Position.y}</div>
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
