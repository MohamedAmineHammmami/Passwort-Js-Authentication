import React from "react";
import me from "../../../public/me.jpg";
import { axiosInstance } from "../../helper/axiosInstance";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const res = await axiosInstance.get("/logout");
      console.log(res.data);
      navigate("/signIn");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section
      className="w-100 px-4 py-5"
      style={{ backgroundColor: "#0d6efd", borderRadius: ".5rem .5rem 0 0" }}
    >
      <div className="row d-flex justify-content-center">
        <div className="col col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src={me}
                    alt="Generic placeholder image"
                    className="img-fluid"
                    style={{ width: "180px", borderRadius: "10px" }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-1">Mohamed Amine Hammami</h5>
                  <p className="mb-2 pb-1">Senior Developer</p>
                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary">
                    <div>
                      <p className="small text-muted mb-1">Articles</p>
                      <p className="mb-0">41</p>
                    </div>
                    <div className="px-3">
                      <p className="small text-muted mb-1">Followers</p>
                      <p className="mb-0">976</p>
                    </div>
                    <div>
                      <p className="small text-muted mb-1">Rating</p>
                      <p className="mb-0">8.5</p>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-primary me-1 flex-grow-1"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
