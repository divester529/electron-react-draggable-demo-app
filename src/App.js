import React, { useState, useEffect, } from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';

import logo from './logo.svg';
import './App.css';

function App() {
  const [draggables, setDraggables] = useState([
    { pos: { x: 0, y: 0 } },
    { pos: { x: 0, y: 0 } },
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
      <div style={{backgroundColor: '#ff00ff'}}>
        <button
          onClick={() => {
            setDraggables([...draggables, { pos: { x: 0, y: 0 }}]);
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
              <div>Element {index}</div>
              <div>X: {draggableComponent.pos.x}</div>
              <div>Y: {draggableComponent.pos.y}</div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
