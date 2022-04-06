import React, { useState, useEffect, } from 'react';
import Draggable from 'react-draggable';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import DisplayContent  from './components/DisplayContent';
import Properties from './components/Properties';

const ELEMENTS = {
  "div": (index, properties, setSelectedIndex) => 
    (<div
      className="handle"
      style={{
        border: '1px solid',
        backgroundColor: '#ff00ff',
        width: '100px',
        height: '100px',
        position: 'absolute',
        top: properties.Position.y,
        left: properties.Position.x
      }}
      onClick={(e) => { e.preventDefault(); setSelectedIndex(index); }}
    >{properties.Label}
  </div>),
  "button": (index, properties, setSelectedIndex) => 
  (<Button
    variant="contained"
    className="handle"
    style={{
      position: 'absolute',
      top: properties.Position.y,
      left: properties.Position.x
    }}
    onClick={(e) => { e.preventDefault(); setSelectedIndex(index); }}
  >{properties.Label}
  </Button>),

}

const useStyles = makeStyles({
  pane: {
    backgroundColor: '#ffffff',
    height: '50vh',
    border: '1px solid',
    color: '#000000'
  }
});

function App() {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggables, setDraggables] = useState([
    { Name: 'Element 0', Label: 'Element 0', Type: 'div', Position: { x: 0, y: 0 } },
    { Name: 'Element 1', Label: 'Element 1', Type: 'div', Position: { x: 0, y: 0 } },
  ]);

  useEffect(() => {
    console.log(draggables);
  }, [draggables]);

  return (
    <div
      className="App"
      style={{
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
                color: '#000000',
                borderRight: '1px solid',
                height: '46vh',}}
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
                borderRight: '1px solid',
                borderBottom: '1px solid',
                color: '#000000',
                height: '4vh',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingBottom: '0.5rem',
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setDraggables([
                    ...draggables,
                    {
                      Name: `Element ${draggables.length}`,
                      Label: `Element ${draggables.length}`,
                      Type: 'div',
                      Position: { x: 0, y: 0 },
                    }]);
                }}
              >
                Add
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.pane}
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
          <div className="box" style={{width: '100%', height: '100vh', position: 'relative', overflow: 'auto', backgroundColor: "#282c34", padding: '0'}}>
            {draggables.map((draggableComponent, index) => (
              <Draggable
                handle=".handle"
                positionOffset={{ x: 'left', y: 'top' }}
                position={draggableComponent.Position}
                grid={[25, 25]}
                scale={1}
                bounds={{left: 0, top: 0, right: 2500, bottom: 2500}}
                onDrag={(e, data) => {
                  e.preventDefault();
                  e.stopPropagation();

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
                {ELEMENTS[draggableComponent.Type](index, draggableComponent, setSelectedIndex)}
              </Draggable>
            ))}
          </div>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              className={classes.pane}
            >
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.pane}
            >
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
