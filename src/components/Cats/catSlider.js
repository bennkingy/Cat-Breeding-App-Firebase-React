import React, { Fragment } from 'react';
import { withFirebase } from '../Firebase';
import { Switch, Route, Link } from 'react-router-dom';

const CatSlider = () => (
  <div>
    <h1 className="my-4 mb-10 text-2xl md:text-2xl text-center lg:text-5xl font-black leading-tight">
      Our latest stud's
    </h1>
    <CatSliders />
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

  render() {


    console.log('landing', this.state);

    const { cats, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        {cats ? (
        <div>
          <CatList cats={cats} />
        </div> ) : (
          <div>There are no cats</div>
        )}
      </div>
    );
    
  }

}

const CatList = ({ cats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 -m-8">
    { cats && cats.slice().reverse().slice(0, 3).map(cat => (
      <CatItem key={cat.uid} cat={cat} />
    ))}
</div>
)

const CatItem = ({ cat }) => (
  <a href={'/cat/'+(cat.uid).substr(1)}>
    <div className="h-auto py-2 m-8">
      <div className="h-48 flex-none bg-cover rounded-t text-center overflow-hidden" style={{ backgroundImage: `url(${cat.imageURL})` }} title="">
      </div>
      <div className="border-r border-b border-l border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
        <div className="">
          <div className="text-gray-900 font-bold text-xl">{cat.text}</div>
          <p className="text-gray-700 text-base">{cat.description ? cat.description : ''}</p>
        </div>
      </div>
    </div>
  </a>
)

const CatSliders = withFirebase(CatBase);

export default CatSlider;