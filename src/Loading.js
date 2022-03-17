export default function Loading ({$app, initialState}) {
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.className = "Modal"
  $app.appendChild(this.$target);

  this.setState = nextState => {

    this.state = nextState;
    console.log('Setting the state of Loading');
    console.log('isLoading', this.state.isLoading)
    this.render();
  }

  this.render = () => {
    console.log('Loading rendering');
    
    this.$target.innerHTML = '<div><img src="assets/nyan-cat.gif"></div>'
    

    this.$target.style.display = this.state.isLoading ? 'block' : 'none';

  }
}