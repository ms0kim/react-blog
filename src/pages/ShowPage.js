import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/toast";

const ShowPage = () => {
  //routes의 /:id
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [timer, setTimer] = useState(0);
  const { addToast } = useToast();
  const [error, setError] = useState('');


  const getPost = (id) => {
    axios.get(`https://react-blog.herokuapp.com/posts/${id}`).then((res) => {
      setPost(res.data)
      setLoading(false);
    }).catch(e => {
      setError('Something went wrong in db');
      addToast({
        text: 'Something went wrong in db',
        type: 'danger'
      })
      setLoading(false);
    })
  };


  //타이머
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      //해당 페이지를 벗어나면 클리어
      clearInterval(interval);
    }
  }, []);


  useEffect(() => {
    getPost(id)
  }, [id])

  //Date.now -> string
  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="listShow">
      <div className="showTitle">
        <h3>
          {post.title}
          <span>
            {isLoggedIn && <Link
              className="showBtn"
              to={`/blog/${id}/edit`}
            >
              Edit
            </Link>}
          </span>
        </h3>
        <span>이 글을 {timer}초 동안 보고 있어요</span>
      </div>
      <p className="time">
        {printDate(post.createdAt)}
      </p>
      <p className="bodyText">{post.body}</p>
    </div>
  );
};

export default ShowPage;