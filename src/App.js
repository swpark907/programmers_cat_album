import Nodes from "./Nodes.js";
import Breadcrumb from "./Breadcrumb.js";
import { request } from "./api.js";

function App ( $app ) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const breadcrumb = new Breadcrumb({$app, initialState: this.state})
  const nodes = new Nodes({$app, initialState: this.state});

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(nextState);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  }

  const init = async () => {
    try{
      const rootNodes = await request()
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      })
    } catch(e) {
      console.log(e);
    }
  }
}

export default App;
