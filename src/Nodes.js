export default function Nodes ({$app, initialState, onClick}) {

  this.onClick = onClick;

  this.state = initialState;

  this.$target = document.createElement('ul');
  this.$target.className = 'Nodes'
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
      this.state(nextState);

      this.render();
  }

  this.render = () => {
      this.$target.innerHTML = this.state.nodes.map((node) => (
          `<li>
              ${node.name}
          </li>`
      ))
  }

  this.render();
}