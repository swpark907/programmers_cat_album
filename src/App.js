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

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: async (index) => {
      try {

        const length = this.state.depth.length;
        
        if(index === length - 1){
          return;
        }
        const nextDepth = this.state.depth.slice(0, index+1);

        if (index === undefined) {
          this.setState({
            ...this.state,
            nodes: cache.rootNodes,
            depth: [],
            isRoot: true,
            isLoading: false,
          });
          return;
        }

        if(cache[this.state.depth[index].id]){
          this.setState({
            ...this.state,
            depth: nextDepth,
            nodes: cache[this.state.depth[index].id],
          })
          return;
        }

      } catch (e) {
        // 에러처리
      }
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {

          if(cache[node.id]){
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: cache[node.id],
              isRoot: false,
              isLoading: false,
            })
            return;
          }

          this.setState({
            ...this.state,
            isLoading: true,
          });

          const nextNodes = await request(node.id);
          cache[node.id] = nextNodes;

          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
            isRoot: false,
            isLoading: false,
          });

        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
            isLoading: false,
          });
        }
      } catch (e) {
        // 에러처리
      }
    },
    onBackClick: async (node) => {
      const nextState = {...this.state};
      nextState.depth.pop();

      const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

      if(prevNodeId === null){
        this.setState({
          ...this.state,
          isRoot: true,
          nodes: cache.rootNodes,
        })
      } else {
        // const prevNode = await request(prevNodeId);
        this.setState({
          ...nextState,
          nodes: cache[prevNodeId],
          isRoot: false,
        })
      }
    },
  });


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
