import { useEffect } from 'react';
import { connect } from 'react-redux';

import Donut from '../components/Charts/Donut';
import "./index.scss"

const Dashboard = () => {

    useEffect(() => {

    }, []);

    const chartProps = [
        {
            labels: ["Sale", "Others"],
            series: [684, 1000 - 684]
        },
        {
            labels: ["Rent", "Others"],
            series: [550, 1000 - 550]
        },
        {
            labels: ["Customers", "Others"],
            series: [5684, 10000 - 5684]
        },
        {
            labels: ["Cities", "Others"],
            series: [555, 1000 - 555]
        }
    ]

    return (
        <>
            <div className="container">
                <div className="title">
                    Dashboard
                </div>
                <div className="single-charts">
                    {chartProps.map((chart, index) => (
                        <div key={index} className={`${chart.labels[0].toLowerCase()} card`}>
                            <div>
                                <div className="card-title">
                                    Properties for {chart.labels[0]}
                                </div>
                                <div className="card-details">{chart.series[0]}</div>
                            </div>
                            <div className="card-chart">
                                <Donut labels={chart.labels} series={chart.series} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="multiple-charts">

                </div>
            </div >
        </>
    );
};

const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
