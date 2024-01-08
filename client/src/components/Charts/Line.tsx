import React from "react";

interface LineProps {
    name: string;
    bgcolor: string;
    progress: string;
}

const SingleLine: React.FC<LineProps> = (props) => {
    const { name, bgcolor, progress } = props;

    return (
        <div className="progress-bar">
            <div className="info">
                <div>{name}</div>
                <div>{progress}%</div>
            </div>
            <div className="bar" style={{ width: `${progress}%`, backgroundColor: bgcolor }}>
            </div>
        </div>
    );
};

const Line: React.FC<{ bars: Array<{ name: string; bgcolor: string; progress: string; }> }> = ({
    bars,
}) => {
    return (
        <div className="progress-bars">
            {bars.map((bar, index) => (
                <SingleLine key={index} name={bar.name} bgcolor={bar.bgcolor} progress={bar.progress} />
            ))}
        </div>
    );
};

export default Line;
