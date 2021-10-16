import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../utils/sub';

const SubList = () => {
  const [Subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs()
      .then((s) => {
        setSubs(s.data);
        setLoading(false);
      })
      .catch();
  }, []);

  const showSubs = () =>
    Subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-raised m-3 btn-block"
      >
        <Link to={`/sub/${s.slug}`}> {s.name} </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center"> Loading .... </h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
