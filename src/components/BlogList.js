import axios from "axios";
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import propTypes from "prop-types";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import useToast from "../hooks/toast";



const BlogList = ({ isAdmin }) => {
  //history -> navigate
  const navigate = useNavigate();
  //location : 현재 페이지의 정보
  const location = useLocation();
  //현재 url의 스트링 정보
  const params = new URLSearchParams(location.search);
  //현재 url의 key:page 숫자
  const pageParam = params.get('page')
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  //포스트 총 갯수
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  //페이지 총 갯수
  const [numberOfPages, setNumberOfPages] = useState(0);
  //한페이지에 보이는 글 갯수
  const limit = 3;
  //검색
  const [searchText, setSearchText] = useState('');
  const { addToast } = useToast();
  const [error, setError] = useState();


  //포스트 갯수 / 5 => 반올림
  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts/limit));
  }, [numberOfPosts]);


  //페이지 기록 남기기
  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`)
    setCurrentPage(page);
    getPosts(page);
  }


  //새로운 함수 생성하지 않도록 useCallback 사용
  //기본값 1
  const getPosts = useCallback((page = 1) => {
    //json server에서 가져오는 정보들
    let params = {
      _page: page,
      _limit: limit,
      _sort: 'id',
      _order: 'desc',
      title_like: searchText
    }

    if (!isAdmin) {
      params = {...params, publish: true}
    }

    axios.get(`https://react-blog.herokuapp.com/posts`, {
       params: params
    }).then((res) => {
      //포스트 총 갯수
      setNumberOfPosts(res.headers['x-total-count']);
      setPosts(res.data);
      setLoading(false);
      //전송이 완료 됐을 때 로딩 false
    }).catch(e => {
      //전송이 실패했을 때 catch를 이용
      setLoading(false);
      setError('Something went wrong in database');
      addToast({
        text: 'Something went wrong',
        type: 'danger'
      })
    })
  }, [isAdmin, searchText])


  useEffect(() => {   
    //page key 기본값 1로 설정
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, []);

  //DB값 삭제
  const deleteBlog = (e, id) => {
    //이벤트 버블링
    e.stopPropagation();
    axios.delete(`https://react-blog.herokuapp.com/posts/${id}`).then(() => {

      //삭제했을 때 1페이지로 이동
      getPosts(1);
      addToast({
        text: 'Successfully deleted',
        type: 'success'
      });
    }).catch(e => {
      addToast({
        text: 'The blog could not be deleted',
        type: 'danger'
      })
    });
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  const renderBlogList = () => {
    return posts.filter(post => {
      //관리자일 때만 admin 보이기
      return isAdmin || post.publish
    }).map(post => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          {isAdmin ? (<div>
            <button 
              className="del"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>) : null}
        </Card>
      );
    })
  }

  //검색창에 텍스트를 입력했을 때
  const onSearch = (e) => {
    //엔터를 눌렀을 때 값을 가져옴
    if (e.key === 'Enter') {
      navigate(`${location.pathname}?page=1`)
      //검색 후 1페이지를 보여줌
      setCurrentPage(1); 
      getPosts(1);
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <input 
        type="text"
        placeholder="검색어를 입력해주세요"
        className="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />

      {posts.length === 0 
        ? <div>No blog posts found</div> 
        : <>
          {renderBlogList()}
          {numberOfPages > 1 && <Pagination 
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            onClick={onClickPageButton}
          />}
        </>}
    </div>
  )
};

BlogList.protoTypes = {
  isAdmin: propTypes.bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;