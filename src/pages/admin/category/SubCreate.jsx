import { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSub, removeSub, getSubs } from '../../../utils/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { getCategories } from '../../../utils/category';
const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  //one user clicked
  const [category, setCategory] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [subs, setSubs] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c?.data));

  const loadSubs = async () => {
    try {
      const value = await getSubs();
      return setSubs(value.data);
    } catch (error) {}
  };

  //when the component mounts
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const handleRemove = async (slug) => {
    if (window.confirm('Are you sure ? ')) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name}Successfully deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err);
          }
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createSub({ name, parent: category }, user.token);
      setLoading(false);
      setName('');
      toast.success(`${res.data.name} is created`);
      loadSubs();
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) toast.error(err);
    }

    // setLoading(true);

    // createSub({ name, parent: category }, user.token)
    //   .then((res) => {
    //     console.log(res);
    //     setLoading(false);
    //     setName('');
    //     toast.success(`${res.data.name} is created`);
    //     loadSubs();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoading(false);
    //     if (err.response.status === 400) toast.error(err);
    //   });
  };

  //function on the map method
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create sub category</h4>
          )}

          <div className="form-group">
            <label htmlFor=""> Parent Category</label>

            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option> Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} className="form-control">
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} curve={1} />

          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {' '}
              {s.name}{' '}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>{' '}
              <span className="btn btn-sm float-right">
                <Link to={`/admin/sub/${s.slug}`}>
                  {' '}
                  <EditOutlined className="text-warning" />{' '}
                </Link>
              </span>{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
