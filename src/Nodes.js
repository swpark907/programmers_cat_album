export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.state = initialState;

  this.$target = document.createElement("ul");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const targetTemplate = this.state.nodes
      .map((node) => {
        const iconPath =
          node.type === "DIRECTORY" ? "directory.png" : "file.png";

        return `
        <li class="Node" data-node-id=${node.id}>
            <img src='assets/${iconPath}'
            <div>${node.name}</div>
          </li>`;
      })
      .join("");

    this.$target.innerHTML = `
      ${
        !this.state.isRoot
          ? `<li class="Node prev">
          <img src="assets/prev.png">
          </li>`
          : ''
      }
      ${targetTemplate}
    `;
  };

  this.$target.addEventListener("click", (event) => {
    const $node = event.target.closest(".Node");

    if ($node) {
      const { nodeId } = $node.dataset;

      if(!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
      console.log({ selectedNode });

      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });

  this.render();
}
