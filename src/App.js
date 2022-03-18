import Nodes from "./Nodes.js";
import Breadcrumb from "./Breadcrumb.js";
import ImageView from "./ImageView.js";
import { request } from "./api.js";
import Loading from "./Loading.js";

const cache = {};

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
      cache.rootNodes = rootNodes;
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}

export default App;
