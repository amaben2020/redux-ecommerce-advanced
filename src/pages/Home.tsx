import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';

import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={['New Arrivals', 'Best Sellers']} />
      </div>

      <h4 className="text-center mt-5 mb-5 display-3 jumbotron">
        {' '}
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center mt-5 mb-5 display-3 jumbotron">
        {' '}
        Best Sellers
      </h4>
      <BestSellers />

      <br />
      <br />
      <h4 className="text-center mt-5 mb-5 display-3 jumbotron"> Categories</h4>
      <CategoryList />

      <h4 className="text-center mt-5 mb-5 display-3 jumbotron">
        {' '}
        Sub categories
      </h4>
      <SubList />
    </>
  );
};

export default Home;
