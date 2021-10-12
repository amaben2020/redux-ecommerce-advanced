import { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateCategory, getCategory } from '../../../utils/category';
import CategoryForm from '../../../components/forms/CategoryForm';
const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategory = () => {
    return getCategory(match.params.slug, user.token)
      .then((c) => {
        setLoading(false);
        setName(c.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is updated`);
        history.push('/admin/category');
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
            <h4>Update category</h4>
          )}

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
