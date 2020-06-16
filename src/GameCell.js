import React from 'react';


class GameCell extends React.Component
{
    render() {
        const gameX = this.props.cell.x;
        const gameY = this.props.cell.y;

        return <div style={{
            "position": "absolute",
            "left": `${gameX * this.props.size + this.props.viewportX}px`,
            "top": `${gameY * this.props.size + this.props.viewportY}px`,
            "width": `${this.props.size}px`,
            "height": `${this.props.size}px`,
            "border": "1px dotted grey",
            "backgroundImage": `url('/images/${this.props.cell.type}.png')`,
            "backgroundRepeat": "no-repeat",
            // "backgroundAttachment": "fixed",
            "backgroundSize": "100% 100%",
            "userSelect": "none"
        }}
        >

        </div>
    }
}




export default GameCell;


