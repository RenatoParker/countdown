import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'


function computeAverage() {
  const a = [];
  const length = 100000;
  let i;
  let sum = 0;
  console.log("Starting..");
  for (i = length; i >= 0; i--) {
    console.log(i);
    a.push(i);
  }
  console.log(a.length);
  function bubbleSort(a) {
    let swapped;
    let i;
    let temp;
    do {
      swapped = false;
      for (i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i + 1]) {
          temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  }
  bubbleSort(a);
  for (i = length; i >= 0; i--) {
    sum += a[i];
  }
  const average = sum / length;
  return average;
}

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const buttonStyles = {
  fontSize: "18px",
  marginRight: "10px"
};

class App extends React.Component {
  state = {
    average: "N/A",
    loading: false
  };

  componentDidMount() {
    this.worker = new Worker("/test.worker.js");

    this.worker.addEventListener("message", ({ data }) => {
      console.log(data);
      this.setState(state => ({ average: data, loading: false }));
    });
  }

  componentWillUnmount() {
    this.worker.terminate();
  }

  computeAverage = e => {
    this.setState(state => ({
      loading: true
    }));
    const { target } = e;
    const isWorkerTask = !!(
      target.getAttribute("data-type") === "with-webworker"
    );

    if (isWorkerTask) {
      this.worker.postMessage("compute");
    } else {
      const average = computeAverage();
      console.log(average);
      this.setState(state => ({
        loading: false,
        average
      }));
    }
  };

  renderContent() {
    const { average, loading } = this.state;

    if (loading) return <h2>Computing...</h2>;
    return <h2>Average is: {average}</h2>;
  }

  render() {
    return (
      <div style={styles}>
        <Hello name="Web Worker" />
        <button
          onClick={this.computeAverage}
          data-type="with-webworker"
          style={buttonStyles}
        >
          Compute with web worker
        </button>
        <button
          onClick={this.computeAverage}
          data-type="without-webworker"
          style={buttonStyles}
        >
          Compute without web worker
        </button>
        {this.renderContent()}
        <ReactCountdownClock
          seconds={100}
          color="#e56"
          alpha={0.9}
          size={300}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

