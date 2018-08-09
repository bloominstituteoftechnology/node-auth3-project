import React, { Component } from 'react';

const Timeout = Composition =>
    class extends Component {
        constructor() {
            super();

            this.state = {
                timeouts: [],
                intervals: []
            }

            // ES6 arrow functions don't carry arguments, so need to use bind.
            this.setTimeout = this.setTimeout.bind(this);
            this.setInterval = this.setInterval.bind(this);
        }

        setTimeout() {
            let timeouts = this.state.timeouts.slice();
            timeouts.push(setTimeout.apply(null, arguments));
            this.setState({ timeouts });
        }

        setInterval() {
            let intervals = this.state.intervals.slice();
            intervals.push(setInterval.apply(null, arguments));
            this.setState({ intervals });
        }

        clearTimeouts = () => {
            this.state.timeouts.forEach(clearTimeout);
        }

        clearIntervals = () => {
            this.state.intervals.forEach(clearInterval);
        }

        componentWillUnmount() {
            this.clearTimeouts();
            this.clearIntervals();
        }

        render() {
            const { setTimeout, setInterval, clearTimeouts, clearIntervals } = this;
            return <Composition
                timeouts={this.state.timeouts}
                setTimeout={setTimeout}
                setInterval={setInterval}
                clearTimeouts={clearTimeouts}
                clearIntervals={clearIntervals}
                {...this.props} />

        }
    }

export default Timeout;