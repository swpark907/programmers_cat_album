export default function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;

  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    console.log('setState for breadcrumb')
    this.render();
  };

  this.render = () => {
    // console.log(this.state);
    this.$target.innerHTML = `<div class="nav-item">root</div>    
    ${this.state.map( (node, index) =>

      
        (`<div class="nav-item" data-index=${node.id}>
            ${node.name}
        </div>`)
    ).join('')}`;
  };

  this.render();
}