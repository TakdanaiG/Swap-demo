import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
    return (
        <div className="container">
            <div className="mt-5">
                <h1 className="text-white mb-4">Welcome to Admin Page</h1>
                <br></br>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user_table">
                            <button className="btn btn-primary btn-lg btn-block">View User Table</button>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/review_table">
                            <button className="btn btn-primary btn-lg btn-block">View User Review</button>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/transaction">
                            <button className="btn btn-primary btn-lg btn-block">View Transaction</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default AdminPage;
