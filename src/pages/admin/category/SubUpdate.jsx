import { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getSub, updateSub } from '../../../utils/sub';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getCategories } from '../../../utils/category';
import SelectOption from '../../../components/forms/SelectOption';
import { messageDisplay } from '../../../utils/toastMessage';
const SubUpdate = ({ match, history }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [parent, setParent] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c?.data));

  const loadSub = async () => {
    try {
      const value = await getSub(match.params.slug, user.token);
      console.log(value);
      setName(value.data?.name);
      //parent is under category
      setParent(value.data?.parent);
    } catch (error) {
      console.log(error);
    }
  };

  //when the component mounts
  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName('');
        messageDisplay(`${res.data.name} is succes updated`);
        // toast.success(`${res.data.name} is updated`);
        history.push('/admin/sub');

        loadSub();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err);
      });
  };

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
          {/* {CategoryForm()} */}

          <div className="form-group">
            <label htmlFor=""> Parent Category</label>

            <SelectOption
              categories={categories}
              parent={parent}
              setCategory={setCategory}
            />
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
