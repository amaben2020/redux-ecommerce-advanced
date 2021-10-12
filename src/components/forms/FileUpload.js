import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Avatar, Badge } from 'antd';
const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  //we need values because thats the image array
  const fileUploadAndResize = (e) => {
    //you also need the user token for uploads

    //for single upload
    // let files = e.target.files[0];

    //multiple file upload
    let files = e.target.files;

    // the image array
    let allUploadedFiles = values.images;

    // if (files.type !== 'image/jpeg') {
    //   alert('Please enter a valid image');
    //   toast.error('This is not an image, upload a valid image');
    //   window.location.reload();
    //   throw new Error('Not supported');
    // }

    if (files) {
      setLoading(true);
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            //uri is the base64
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
                console.log('IMAGE UPLOAD RESPONSE DATA', res);
              })
              .catch((err) => {
                setLoading(false);
                console.log('UPLOAD ERROR', err);
              });
          },
          'base64'
        );
      }
    }

    //the file itself
    console.log(e.target.files);

    //resize

    //send back to server to upload to cloudinary

    // set url to images[] in the parent component (product create)
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    console.log('REMOVE', id);
    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id: id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false);
        //remove the image from the state
        const { images } = values;
        let filteredImages = images.filter((image) => {
          return image.public_id !== id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <div className="col">
              <Badge
                count="X"
                key={image.public_id}
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: 'pointer' }}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  className="ml-2"
                  shape="square"
                />
              </Badge>
            </div>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose file
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
