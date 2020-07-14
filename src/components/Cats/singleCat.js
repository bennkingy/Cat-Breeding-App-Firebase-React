import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SingleCatPage = () => (
  <div>
    <h1>Cat</h1>
    <p>Cat page.</p>
    <Switch>
      <Route exact path={ROUTES.CAT_DETAILS} component={CatItem} />
    </Switch>
  </div>
)

class CatItemBase extends React.Component {

  constructor(props) {
		super(props)
		this.state = {
			loading: false,
      cat: null,
      ...props.location.state
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
            <span>
              <strong>ID:</strong>                                                                                  
              <div className="h-48 bg-cover rounded-t text-center overflow-hidden" style={{ backgroundImage: `url(${cat[this.props.match.params.id].imageURL})` }} title=""></div>
            </span>          
          </div>
        )}
      </div>
    );
  }
}
 
const CatItem = withFirebase(CatItemBase);  

export default SingleCatPage;