import Jumbotron from '../components/cards/Jumbotron';
import BestSellers from '../components/home/BestSellers';

import NewArrivals from '../components/home/NewArrivals';

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
    </>
  );
};

export default Home;
