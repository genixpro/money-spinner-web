import React from 'react';


class GameBuildingObject extends React.Component
{
    render() {
        const gameX = this.props.buildingObject.x;
        const gameY = this.props.buildingObject.y;

        return <div style={{
            "position": "absolute",
            "left": `${gameX * this.props.size + this.props.viewportX}px`,
            "top": `${gameY * this.props.size + this.props.viewportY}px`,
            "width": `${this.props.size}px`,
            "height": `${this.props.size}px`,
            "backgroundImage": `url('/images/${this.props.buildingObject.name}.png')`,
            "backgroundRepeat": "no-repeat",
            // "backgroundAttachment": "fixed",
            "backgroundSize": "100% 100%",
            "userSelect": "none"
        }}
        >

        </div>
    }
}




export default GameBuildingObject;


