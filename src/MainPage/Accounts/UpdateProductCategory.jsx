import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCategoryAction } from "../../redux/actions/productActions";

const UpdateProductCategory = ({ productCategoryObject }) => {
  const dispatch = useDispatch();

  const { token, userPreference } = useSelector((state) => state.userReducer);
  const { company } = useSelector((state) => state.companyReducer);

  const [name, setName] = React.useState("");

  const closeRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    let promise = new Promise((resolve, reject) => {
      dispatch(
        updateProductCategoryAction(
          company.id,
          token,
          formData,
          productCategoryObject.id
        )
      );
      resolve();
    });
    promise.then(() => {
      closeRef.current.click();
    });
  };

  useEffect(() => {
    setName(productCategoryObject.name);
  }, [productCategoryObject]);

  return (
    <>
      <div
        id="update_product_category"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userPreference && userPreference.language_name === "EN"
                  ? "Update Category"
                  : "ক্যাটাগরি আপডেট করুন"}
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>
                        {userPreference && userPreference.language_name === "EN"
                          ? "Category Name"
                          : "ক্যাটাগরি নাম"}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={name}
                        name="name"
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                        required
                      />
                      {name?.length >= 50 && (
                        <span className="text-danger mt-2 d-inline-block">
                          {userPreference &&
                          userPreference.language_name === "EN"
                            ? "Category name must be less than 50 characters"
                            : "ক্যাটাগরি নাম ৫০ অক্ষরের কম হতে হবে"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  {name?.length <= 50 ? (
                    <button className="btn btn-primary submit-btn">
                      {userPreference && userPreference.language_name === "EN"
                        ? "Submit"
                        : "সাবমিট"}
                    </button>
                  ) : (
                    <button className="btn btn-primary submit-btn" disabled>
                      {userPreference && userPreference.language_name === "EN"
                        ? "Submit"
                        : "সাবমিট"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProductCategory;
