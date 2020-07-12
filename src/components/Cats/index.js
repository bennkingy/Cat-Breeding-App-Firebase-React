import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import MapContainer from './gmap';

const CatPage = () => (
  <div>
    <h1>Cats</h1>
    <p>This page is always accessible.</p>
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

    //console.log(this.state);

    const { cats, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        {cats ? (
        <div><CatList cats={cats} />
        <MapContainer cats={cats} /></div> ) : (
          <div>There are no cats</div>
        )}
      </div>
    );
    
  }

}

const CatList = ({ cats }) => (
  <ul className="flex">
    { cats && cats.map(cat => (
      <CatItem key={cat.uid} cat={cat} />
    ))}
  </ul>
)

const CatItem = ({ cat }) => (
  <li>
    <img src={cat.image} width="200px" />
    {cat.text}
  </li>
)

const Cats = withFirebase(CatBase);

export default CatPage;