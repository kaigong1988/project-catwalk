import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.createInfo();
  }

  createInfo() {
    let compare = [];
    let memory = {};
    for (let i = 0; i < this.props.focusFeatures.length; i++) {
      memory[this.props.focusFeatures[i].feature] = {
        feature: this.props.focusFeatures[i].feature,
        featVal: this.props.focusFeatures[i].value,
        curVal: ' ',
      };
    }
    for (let i = 0; i < this.props.currentFeat.length; i++) {
      if (memory[this.props.currentFeat[i].feature] === undefined) {
        memory[this.props.currentFeat[i].feature] = {
          feature: this.props.currentFeat[i].feature,
          featVal: ' ',
          curVal: this.props.currentFeat[i].value,
        };
      } else {
        memory[
          this.props.currentFeat[i].feature
        ].curVal = this.props.currentFeat[i].value;
      }
    }
    for (let key in memory) {
      if (memory[key].featVal === 'null') {
        memory[key].featVal = '✓';
      }
      if (memory[key].curVal === 'null') {
        memory[key].curVal = '✓';
      }
      compare.push(memory[key]);
    }
    console.log(this.props.currentFeat);
    this.setState({
      compare: compare,
    });
  }

  render() {
    if (this.state.compare === undefined) {
      return <div>please wait</div>;
    } else {
      return (
        <div className="modal-holder RelatedNOutfit-modalHold">
          <section
            className="modal-main RelatedNOutfit-modal"
            onClick={() => {
              this.props.modalOff();
            }}
          >
            <h7>COMPARING</h7>
            <p>
              <h5 className="modal-product">{this.props.name}</h5>
              <h5 className="modal-prod-current">{this.props.curName}</h5>
            </p>
            {this.state.compare.map((item, index) => {
              return (
                <div className="modal-text" key={index}>
                  <h7 className="modal-left">{item.featVal}</h7>
                  <h7 className="modal-feature">{item.feature}</h7>
                  <h7 className="modal-right">{item.curVal}</h7>
                </div>
              );
            })}
          </section>
        </div>
      );
    }
  }
}

export default Modal;
