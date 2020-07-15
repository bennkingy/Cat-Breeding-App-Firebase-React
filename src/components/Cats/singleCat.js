import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SingleCatPage = () => (
  <div>
    <h1>Cat</h1>
    <p>Cat page.</p>
      <Route component={SingleCat} /> {/* How to make this work as just > <SingleCat /> */}
  </div>
)

class SingleCatBase extends React.Component {

  constructor(props) {
		super(props)
		this.state = {
			loading: false,
      cat: null
		}
  }

  componentDidMount() {
    if (this.state.cats) {
      return
    }
    this.setState({ loading: true });
		this.props.firebase.cats(this.props.match.params.id).on('value', snapshot => {
			this.setState({
				cat: snapshot.val(),
				loading: false
			});
		});
  } 

	componentWillUnmount() {
		this.props.firebase.cats(this.props.match.params.id).off();
  }

  render() {
    const { cat, loading } = this.state;
    console.log(this.state);
    return (
      <div>
        <h2>Cat ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}
        {cat && (
          <div> 
            <h1>{cat['-'+this.props.match.params.id].text ? cat['-'+this.props.match.params.id].text : ''}</h1>                                                                                              
            <div className="h-48 flex-none bg-cover rounded-t text-center overflow-hidden" style={{ backgroundImage: `url(${cat['-'+this.props.match.params.id].imageURL})` }} title=""></div>
          </div>
        )}
      </div>
    );
  }
}
 
const SingleCat = withFirebase(SingleCatBase);  

export default SingleCatPage;