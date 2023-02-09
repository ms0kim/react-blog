import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import propTypes from "prop-types";
import useToast from "../hooks/toast";
import Loading from "./Loading";


const BlogForm = ({ editing }) => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [body, setBody] = useState('');
  const [originalBody, setOriginalBody] = useState('');
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    if(editing) {
        axios.get(`https://react-blog.herokuapp.com/posts/${id}`).then(res => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOriginalBody(res.data.body);
        setPublish(res.data.publish);
        setOriginalPublish(res.data.publish);
        setLoading(false);
      }).catch(e => {
        setError('somthing went wrong in db')
        addToast({
          type: 'danger',
          text: 'somthing went wrong in db'
        })
        setLoading(false);
      })
    } else {
      setLoading(false);
    }
  }, [id, editing]);

  //수정 됐는지 체크
  const isEdited = () => {
    return title !== originalTitle
     || body !== originalBody
     || publish !== originalPublish;
  }

  const goBack = () => {
    if (editing) {
      navigate(`/blog/${id}`);
    } else {
      navigate('/admin');
    }
  };

  //내용 비어있는지 검사(유효성 검사)
  const validateForm = () => {
    let validated = true;

    if (title === '') {
      setTitleError(true);
      validated = false;
    }

    if (body === '') {
      setBodyError(true);
      validated = false;
    }

    return validated;
  }

  const onSubmit = () => {
    //검사 한 후 초기화
    setTitleError(false);
    setBodyError(false);

    if (validateForm()) {

      if (editing) {
        axios.patch(`https://react-blog.herokuapp.com/posts/${id}`, {
          title: title,
          body: body,
          publish: publish
        }).then(res => {
          navigate(`/blog/${id}`)
        }).catch(e => {
          addToast({
          text: 'We could not update blog',
          type: 'danger'
        })
        })
      } else {
        axios.post('https://react-blog.herokuapp.com/posts', {
          title,
          body,
          publish,
          createdAt: Date.now()
        }).then(() => {
          addToast({
            type: 'success',
            text: 'Successfully created!'
          });
          navigate('/admin');
        }).catch(e => {
          addToast({
          text: 'We could not create blog',
          type: 'danger'
        })
        })
      }

    }
  };

  const onChangePublish = (e) => {
    setPublish(e.target.checked);
  };

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (<div>{error}</div>)
  }


  return (
    <div className="container">
      <div>
        <h2>{editing ? 'Edit' : 'Create'} a blog post</h2>
        <div className='titleAll'>
          <label className="title">제목</label>
          <input 
            className={`titleInput ${titleError ? 'error' : ''}`}
            value={title} 
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />

          {titleError && <div className="errorText">
            제목을 확인해주세요
          </div>}

        </div>
        <div className='bodyAll'>
          <label className="body">내용</label>
          <textarea
            className={`bodyInput ${bodyError ? 'error' : ''}`}
            rows="10"
            value={body} 
            onChange={(event) => {
              setBody(event.target.value)
            }}
          />

          {bodyError && <div className="errorText">
            내용을 확인해주세요
          </div>}

        </div>

        <div className="check">
            <input
              className="checkInput error"
              type="checkbox"
              checked={publish}
              onChange={onChangePublish}
              id="pub"
            />
            <label for="pub" className="checkLabel">
              공개하기
            </label>
        </div>

        <div className="btns">
          <button
            className="btn"
            onClick={onSubmit}
            disabled={editing && !isEdited()} 
          >
            {editing ? 'Edit' : 'Post'}</button>
          <button
            className="btn"
            onClick={goBack}
          >
            Cancel</button>
        </div>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  editing: propTypes.bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;