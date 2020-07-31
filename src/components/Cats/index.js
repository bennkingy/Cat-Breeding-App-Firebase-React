import React, { Fragment } from 'react';
import { withFirebase } from '../Firebase';
import MapContainer from './gmap.js';
import MapboxGLContainer from './egmap';

const CatPage = () => (
  <div>
    <h1 className="mb-10 text-2xl md:text-2xl text-center lg:text-5xl font-black leading-tight">
      Find your nearest stud
    </h1>
    <Cats />
  </div>
)

class CatBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cats: []
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    this.props.firebase.cats().on('value', snapshot => {
      const catObject = snapshot.val();
      const catList = Object.keys(catObject).map(key => ({
        ...catObject[key],
        uid: key
      }))
      if (catObject) {
        this.setState({ cats: catList, loading: false})
      } else {
        this.setState({ cats: null, loading: false })
      }
    })
  }

  componentWillUnmount() {
    this.props.firebase.cats().off();
  }

  onCreateCat = (e, authUser) => {
    this.props.firebase.cats().push({
      text: this.state.text,
      userId: authUser.uid
    });
    this.setState({ text: '' });
    e.preventDefault();
  }

  onChangeText = e => {
    this.setState({ text: e.target.value });
  };

  render() {

    const { cats, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        {cats.length > 0 && loading === false ? (
          <div className="mapContainerboi">
            <MapboxGLContainer cats={cats} />
          </div>
        ) : (
          <div>There are no cats</div>
        )}
      </div>
    );
    
  }

}

const Cats = withFirebase(CatBase);

export default CatPage;