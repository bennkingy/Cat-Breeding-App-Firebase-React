import React, { Fragment } from 'react';
import { withFirebase } from '../Firebase';

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

    //console.log(this.state);

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
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 -m-8">
    { cats && cats.slice(0, 3).map(cat => (
      <CatItem key={cat.uid} cat={cat} />
    ))}
</div>
)

const CatItem = ({ cat }) => (
    <div className="h-auto py-2 m-8">
      <div className="h-48 flex-none bg-cover rounded-t text-center overflow-hidden" style={{ backgroundImage: `url(${cat.image})` }} title="Woman holding a mug">
      </div>
      <div className="border-r border-b border-l border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal">
        <div className="">
          {/* <p className="text-sm text-gray-600 flex items-center">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
           Locatoin
          </p> */}
          <div className="text-gray-900 font-bold text-xl">{cat.text}</div>
          {/* <p className="text-gray-700 text-base">{cat.text}</p> */}
        </div>
        {/* <div className="flex items-center">
          {cat.image && <img className="w-10 h-10 rounded-full mr-4" src={cat.image} alt="Avatar of Jonathan Reinink"/> }
          <div className="text-sm">
            .<p className="text-gray-900 leading-none"></p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div> */}
      </div>
    </div>
)

const CatSliders = withFirebase(CatBase);

export default CatSlider;