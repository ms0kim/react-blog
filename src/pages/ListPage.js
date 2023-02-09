import BlogList from "../components/BlogList";

const ListPage = () => {

  return (
    <div className="blogList">
      <div className="listTop">
        <h2>Blog List</h2>
      </div>
      <BlogList />
    </div>
  );
};

export default ListPage;