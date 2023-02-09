import { Link } from 'react-router-dom';
import BlogList from "../components/BlogList";


const AdminPage = () => {
  return (
    <div className="blogList">
      <div className="listTop">
        <h2>Admin List</h2>
        <div>
          <Link to="/blog/create" className="btn">Create New</Link>
        </div>
      </div>
      <BlogList isAdmin={true} />
    </div>
  );
};

export default AdminPage;