import React from 'react';
// import axios from "axios/index";
import GameCell from "./GameCell";
import GamePerson from "./GamePerson";
import GameBuildingObject from "./GameBuildingObject";



class GameGrid extends React.Component
{
    state = {
        cellSize: 32,
        dragging: false,
        viewportX: 0,
        viewportY: 0
    };

    constructor() {
        super();

        this.dragStartX = null
        this.dragStartY = null

        this.dragStartMapX = null
        this.dragStartMapY = null
    }

    zoomIn(evt)
    {
        if (this.state.cellSize < 128)
        {
            const cellCoords = this.getCellCoordsAtViewportPosition(evt.pageX, evt.pageY)

            const pageX = evt.pageX;
            const pageY = evt.pageY;

            this.setState({cellSize: Math.floor(this.state.cellSize * 1.10)}, () => this.moveViewTo(cellCoords.x, cellCoords.y, pageX, pageY))
        }

    }

    zoomOut(evt)
    {
        if (this.state.cellSize > 24)
        {
            const cellCoords = this.getCellCoordsAtViewportPosition(evt.pageX, evt.pageY)
            const pageX = evt.pageX;
            const pageY = evt.pageY;

            this.setState({cellSize: Math.floor(this.state.cellSize / 1.10)}, () => this.moveViewTo(cellCoords.x, cellCoords.y, pageX, pageY))
        }
    }

    getCellCoordsAtViewportPosition(x, y)
    {
        const cellX = (x - this.state.viewportX) / this.state.cellSize;
        const cellY = (y - this.state.viewportY) / this.state.cellSize;

        return {x: Math.floor(cellX), y: Math.floor(cellY)}
    }


    moveViewTo(cellX, cellY, pageX, pageY)
    {
        this.setState({
            viewportX: -cellX * this.state.cellSize + pageX,
            viewportY: -cellY * this.state.cellSize + pageY,
        })
    }


    mouseDown(evt)
    {
        if (!this.state.dragging)
        {
            this.setState({
                dragging: true,
            })

            this.dragStartX = evt.clientX;
            this.dragStartY = evt.clientY;

            this.dragStartMapX = this.state.viewportX;
            this.dragStartMapY = this.state.viewportY;
        }
    }

    mouseMove(evt)
    {
        if (this.state.dragging)
        {
            const displacementX = evt.clientX - this.dragStartX;
            const displacementY = evt.clientY - this.dragStartY;

            this.setState({
                viewportX: displacementX + this.dragStartMapX,
                viewportY: displacementY + this.dragStartMapY
            });
        }
    }

    mouseUp(evt)
    {
        if (this.state.dragging)
        {
            this.setState({
                dragging: false,
            })

            this.dragStartX = null;
            this.dragStartY = null;
        }
    }


    onWheel(evt)
    {
        if (evt.deltaY > 0)
        {
            this.zoomOut(evt);
        }
        else if (evt.deltaY < 0)
        {
            this.zoomIn(evt);
        }
        evt.preventDefault();
    }

    render() {
        const viewportWidthInCells = Math.ceil(window.innerWidth / this.state.cellSize);
        const viewportHeightInCells = Math.ceil(window.innerHeight / this.state.cellSize);

        const viewportLeftInCells = Math.floor(-this.state.viewportX / this.state.cellSize);
        const viewportTopInCells = Math.floor(-this.state.viewportY / this.state.cellSize);

        const viewportRightInCells = Math.ceil(viewportLeftInCells + viewportWidthInCells);
        const viewportBottomInCells = Math.ceil(viewportTopInCells + viewportHeightInCells);

        return <div style={{
            "position": "fixed",
            "left": "0",
            "top": "0",
            "width": "100vw",
            "height": "100vh"
        }}
            onWheel={this.onWheel.bind(this)}
            onMouseDown={(evt) => this.mouseDown(evt)}
            onMouseUp={(evt) => this.mouseUp(evt)}
            onMouseMove={(evt) => this.mouseMove(evt)}
        >
            {
                this.props.cells.map((cell) =>
                {
                    if (cell.x > viewportRightInCells || cell.y > viewportBottomInCells)
                    {
                        return null;
                    }
                    if (cell.x < viewportLeftInCells || cell.y < viewportTopInCells)
                    {
                        return null;
                    }

                    return <GameCell cell={cell} size={this.state.cellSize} viewportX={this.state.viewportX} viewportY={this.state.viewportY} key={`cell-${cell.x},${cell.y}`} />
                })
            }

            {
                this.props.people.map((person) =>
                {
                    if (person.x > viewportRightInCells || person.y > viewportBottomInCells)
                    {
                        return null;
                    }
                    if (person.x < viewportLeftInCells || person.y < viewportTopInCells)
                    {
                        return null;
                    }

                    return <GamePerson person={person} size={this.state.cellSize} viewportX={this.state.viewportX} viewportY={this.state.viewportY} key={`person-${person.id}`} />
                })
            }

            {
                this.props.buildingObjects.map((buildingObject) =>
                {
                    if (buildingObject.x > viewportRightInCells || buildingObject.y > viewportBottomInCells)
                    {
                        return null;
                    }
                    if (buildingObject.x < viewportLeftInCells || buildingObject.y < viewportTopInCells)
                    {
                        return null;
                    }

                    return <GameBuildingObject buildingObject={buildingObject} size={this.state.cellSize} viewportX={this.state.viewportX} viewportY={this.state.viewportY} key={`building-object-${buildingObject.id}`} />
                })
            }
        </div>
    }
}

export default GameGrid;


